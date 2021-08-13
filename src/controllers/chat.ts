import type { Context } from "../config/context";
import type {
  UserPayload,
  ChatPayload,
  MessagePayload,
  GraphQLChat
} from "./types";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { io } from "..";
import { userSelect, chatSelect, messageSelect } from "./types";
import { resolveUser } from "./user";
import { resolveMessage } from "./message";

type ChatArgs = {
  chatId?: string;
  name?: string;
  userId?: string;
  userIds?: string[];
};

export function resolveChat(
  chat: ChatPayload & { messages?: MessagePayload[] }
): GraphQLChat {
  return {
    id: chat.id,
    name: chat.name,
    admin: resolveUser(chat.admin),
    users: chat.users.map(u => resolveUser(u)),
    message: chat.message
      ? resolveMessage(chat.message as MessagePayload)
      : null,
    messages: chat.messages
      ? chat.messages.map(m => resolveMessage(m))
      : undefined,
    __typename: "Chat"
  };
}

export function findChats(
  _: unknown,
  __: unknown,
  context: Context
): Promise<(ChatPayload & { messages: MessagePayload[] })[]> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  return context.prisma.chat.findMany({
    where: {
      OR: [
        { admin: { id: context.user.id } },
        { users: { some: { id: context.user.id } } }
      ]
    },
    orderBy: { id: "asc" },
    select: {
      ...chatSelect,
      messages: { orderBy: { time: "desc" }, select: messageSelect }
    }
  });
}

export async function createChat(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload & { messages: MessagePayload[] }> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.userIds) throw new UserInputError("User ids not provided");
  if (!args.userIds.length)
    throw new UserInputError("Cannot create chat with zero users");
  const chats = await context.prisma.chat.findMany({
    where: {
      admin: {
        OR: [{ id: context.user.id }, ...args.userIds.map(id => ({ id }))]
      },
      users: { every: { id: { in: [context.user.id, ...args.userIds] } } }
    },
    select: { admin: { select: { id: true } }, users: { select: { id: true } } }
  });
  const __chat = chats.find(c => {
    const _everyone = [c.admin.id, ...c.users.map(u => u.id)].sort();
    const everyone = [
      (context.user as UserPayload).id,
      ...(args.userIds as string[])
    ].sort();
    if (_everyone.length !== everyone.length) return false;
    for (let i = 0; i < _everyone.length; i++)
      if (_everyone[i] !== everyone[i]) return false;
    return true;
  });
  if (__chat) throw new UserInputError("Chat already exists");
  const _chat = await context.prisma.chat.create({
    data: {
      admin: { connect: { id: context.user.id } },
      users: { connect: args.userIds.map(id => ({ id })) }
    }
  });
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  await context.prisma.message.create({
    data: {
      text: `${context.user.username} created this chat on ${month}/${day}/${year}`,
      latest: { connect: { id: _chat.id } },
      chat: { connect: { id: _chat.id } }
    }
  });
  const chat = (await context.prisma.chat.findUnique({
    where: { id: _chat.id },
    select: { ...chatSelect, messages: { select: messageSelect } }
  })) as ChatPayload & { messages: MessagePayload[] };
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("CHAT_CREATED", resolveChat(chat));
  return chat;
}

export async function leaveChat(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  const _chat = await context.prisma.chat.findUnique({
    where: { id: args.chatId },
    include: { admin: { select: userSelect }, users: { select: userSelect } }
  });
  if (!_chat) throw new UserInputError("No chat found");
  let chat: ChatPayload;
  if (_chat.admin.id === context.user.id) {
    const { id } = _chat.users[0];
    chat = await context.prisma.chat.update({
      where: { id: args.chatId },
      data: {
        admin: { connect: { id } },
        users: { disconnect: { id } }
      },
      select: chatSelect
    });
  } else {
    chat = await context.prisma.chat.update({
      where: { id: args.chatId },
      data: { users: { disconnect: { id: context.user.id } } },
      select: chatSelect
    });
  }
  if (!chat.users.length) {
    await context.prisma.message.deleteMany({ where: { chatId: _chat.id } });
    const chat = await context.prisma.chat.delete({
      where: { id: _chat.id },
      select: chatSelect
    });
    io.to(chat.admin.id)
      .to(context.user.id)
      .emit("CHAT_DELETED", resolveChat(chat));
    return chat;
  }
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("CHAT_UPDATED", resolveChat(chat));
  io.to(context.user.id).emit("CHAT_DELETED", resolveChat(chat));
  return chat;
}

export async function renameChat(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  if (!args.name) throw new UserInputError("Chat name not provided");
  if (args.name.length > 25)
    throw new UserInputError("Chat name must be less than 25 characters");
  const chat: ChatPayload = await context.prisma.chat.update({
    where: { id: args.chatId },
    data: { name: args.name },
    select: chatSelect
  });
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("CHAT_UPDATED", resolveChat(chat));
  return chat;
}

export async function changeAdmin(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  if (!args.userId) throw new UserInputError("User id not provided");
  const chat = await context.prisma.chat.update({
    where: { id: args.chatId },
    data: {
      admin: { connect: { id: args.userId } },
      users: {
        disconnect: { id: args.userId },
        connect: { id: context.user.id }
      }
    },
    select: chatSelect
  });
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .to(context.user.id)
    .emit("CHAT_UPDATED", resolveChat(chat));
  return chat;
}

export async function addUsers(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  if (!args.userIds) throw new UserInputError("User id not provided");
  if (!args.userIds.length) throw new UserInputError("Cannot add zero users");
  const _chat = (await context.prisma.chat.findUnique({
    where: { id: args.chatId },
    select: { users: { select: userSelect } }
  })) as { users: UserPayload[] };
  const chat: ChatPayload = await context.prisma.chat.update({
    where: { id: args.chatId },
    data: { users: { connect: args.userIds.map(id => ({ id })) } },
    select: chatSelect
  });
  const messages: MessagePayload[] = await context.prisma.message.findMany({
    where: { chatId: chat.id },
    select: messageSelect
  });
  io.to(chat.admin.id)
    .to(_chat.users.map(u => u.id))
    .emit("CHAT_UPDATED", resolveChat(chat));
  io.to(chat.users.map(u => u.id))
    .except(_chat.users.map(u => u.id))
    .emit("CHAT_CREATED", resolveChat({ ...chat, messages }));
  return chat;
}

export async function removeUsers(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  if (!args.userIds) throw new UserInputError("User id not provided");
  if (!args.userIds.length)
    throw new UserInputError("Cannot remove zero users");
  const _chat = await context.prisma.chat.findUnique({
    where: { id: args.chatId },
    include: { admin: { select: userSelect }, users: { select: userSelect } }
  });
  if (!_chat) throw new UserInputError("No chat found");
  const chat: ChatPayload = await context.prisma.chat.update({
    where: { id: args.chatId },
    data: { users: { disconnect: args.userIds.map(id => ({ id })) } },
    select: chatSelect
  });
  if (!chat.users.length) {
    await context.prisma.message.deleteMany({ where: { chatId: _chat.id } });
    const chat = await context.prisma.chat.delete({
      where: { id: _chat.id },
      select: chatSelect
    });
    io.to(chat.admin.id)
      .to(args.userIds)
      .emit("CHAT_DELETED", resolveChat(chat));
    return chat;
  }
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("CHAT_UPDATED", resolveChat(chat));
  io.to(args.userIds).emit("CHAT_DELETED", resolveChat(chat));
  return chat;
}

export async function deleteChat(
  _: unknown,
  args: ChatArgs,
  context: Context
): Promise<ChatPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  await context.prisma.message.deleteMany({ where: { chatId: args.chatId } });
  const chat = await context.prisma.chat.delete({
    where: { id: args.chatId },
    select: chatSelect
  });
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("CHAT_DELETED", resolveChat(chat));
  return chat;
}
