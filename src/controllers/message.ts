import type { Context } from "../config/context";
import type {
  UserPayload,
  ChatPayload,
  MessagePayload,
  GraphQLMessage
} from "./types";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { io } from "..";
import { chatSelect, messageSelect } from "./types";
import { resolveUser } from "./user";
import { resolveChat } from "./chat";

type MessageArgs = {
  text?: string;
  forwarded?: boolean;
  chatId?: string;
  notification?: boolean;
  socketId?: string;
  messageId?: string;
};

export function resolveMessage(message: MessagePayload): GraphQLMessage {
  return {
    id: message.id,
    text: message.text,
    time: message.time,
    forwarded: message.forwarded,
    chatId: message.chatId,
    user: message.user ? resolveUser(message.user) : null,
    reply: message.reply
      ? {
          id: message.reply.id,
          text: message.reply.text,
          user: resolveUser(message.reply.user as UserPayload),
          __typename: "Message"
        }
      : null,
    __typename: "Message"
  };
}

export async function createMessage(
  _: unknown,
  args: MessageArgs,
  context: Context
): Promise<MessagePayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.text) throw new UserInputError("Text not provided");
  if (!args.chatId) throw new UserInputError("Chat id not provided");
  if (!args.text.length) throw new UserInputError("Text cannot be empty");
  if (args.text.length > 150)
    throw new UserInputError("Text must be less than 150 characters");
  if (!args.forwarded) args.forwarded = false;
  let message: MessagePayload;
  if (args.messageId) {
    message = await context.prisma.message.create({
      data: {
        text: args.text,
        forwarded: args.forwarded,
        latest: { connect: { id: args.chatId } },
        chat: { connect: { id: args.chatId } },
        user: { connect: { id: context.user.id } },
        reply: { connect: { id: args.messageId } }
      },
      select: messageSelect
    });
  } else if (args.notification) {
    message = await context.prisma.message.create({
      data: {
        text: args.text,
        forwarded: args.forwarded,
        latest: { connect: { id: args.chatId } },
        chat: { connect: { id: args.chatId } }
      },
      select: messageSelect
    });
  } else {
    message = await context.prisma.message.create({
      data: {
        text: args.text,
        forwarded: args.forwarded,
        latest: { connect: { id: args.chatId } },
        chat: { connect: { id: args.chatId } },
        user: { connect: { id: context.user.id } }
      },
      select: messageSelect
    });
  }
  const chat = (await context.prisma.chat.findUnique({
    where: { id: args.chatId },
    select: chatSelect
  })) as ChatPayload;
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("MESSAGE_CREATED", resolveMessage(message));
  return message;
}

export async function updateMessage(
  _: unknown,
  args: MessageArgs,
  context: Context
): Promise<MessagePayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.messageId) throw new UserInputError("Message id not provided");
  if (!args.text) throw new UserInputError("Text not provided");
  if (!args.text.length) throw new UserInputError("Text cannot be empty");
  if (args.text.length > 150)
    throw new UserInputError("Text must be less than 150 characters");
  const message: MessagePayload = await context.prisma.message
    .update({
      where: { id: args.messageId },
      data: { text: args.text },
      select: messageSelect
    })
    .catch(() => {
      throw new UserInputError("Message not found");
    });
  const chat = (await context.prisma.chat.findFirst({
    where: { messages: { some: { id: args.messageId } } },
    select: chatSelect
  })) as ChatPayload;
  io.to(chat.admin.id)
    .to(chat.users.map(u => u.id))
    .emit("MESSAGE_UPDATED", resolveMessage(message));
  return message;
}

export async function deleteMessage(
  _: unknown,
  args: MessageArgs,
  context: Context
): Promise<MessagePayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.messageId) throw new UserInputError("Message id not provided");
  const _chat = (await context.prisma.chat.findFirst({
    where: { messages: { some: { id: args.messageId } } },
    select: { ...chatSelect, messages: { select: messageSelect } }
  })) as ChatPayload & { messages: MessagePayload[] };
  const message: MessagePayload = await context.prisma.message.delete({
    where: { id: args.messageId },
    select: messageSelect
  });
  if ((_chat.message as MessagePayload).id === args.messageId) {
    const chat: ChatPayload = await context.prisma.chat.update({
      where: { id: _chat.id },
      data: {
        message: {
          connect: { id: _chat.messages[_chat.messages.length - 2].id }
        }
      },
      select: chatSelect
    });
    io.to(chat.admin.id)
      .to(chat.users.map(u => u.id))
      .emit("CHAT_UPDATED", resolveChat(chat));
  }
  io.to(_chat.admin.id)
    .to(_chat.users.map(u => u.id))
    .emit("MESSAGE_DELETED", resolveMessage(message));
  return message;
}
