import type { Context } from "../config/context";
import type { UserPayload, ChatPayload, GraphQLUser } from "./types";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { io } from "..";
import { userSelect, chatSelect, messageSelect } from "./types";
import { resolveChat } from "./chat";

type UserArgs = {
  userId?: string;
  username?: string;
  password?: string;
};

export function resolveUser(user: UserPayload): GraphQLUser {
  return { ...user, __typename: "User" };
}

export function findUser(
  _: unknown,
  __: unknown,
  context: Context
): UserPayload | null {
  if (context.user) return context.user;
  return null;
}

export function findUsers(
  _: unknown,
  __: unknown,
  context: Context
): Promise<UserPayload[]> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  return context.prisma.user.findMany({
    where: { id: { not: context.user.id } },
    select: userSelect
  });
}

export async function login(
  _: unknown,
  args: UserArgs,
  context: Context
): Promise<string> {
  if (!args.username) throw new UserInputError("Username not provided");
  if (!args.password) throw new UserInputError("Password not provided");
  const user = await context.prisma.user.findUnique({
    where: { username: args.username }
  });
  if (!user) throw new AuthenticationError("User does not exist");
  const passwordsMatch = await bcrypt.compare(args.password, user.passwordHash);
  if (!passwordsMatch) throw new AuthenticationError("Incorrect password");
  const token: UserPayload = { id: user.id, username: user.username };
  return jwt.sign(token, process.env.JWT_KEY as string, {
    expiresIn: 60 * 60 * 24 * 14
  });
}

export async function createUser(
  _: unknown,
  args: UserArgs,
  context: Context
): Promise<UserPayload> {
  if (!args.username) throw new UserInputError("Username not provided");
  if (!args.password) throw new UserInputError("Password not provided");
  if (args.username.length < 3) throw new UserInputError("Username too short");
  if (args.username.length > 7) throw new UserInputError("Username too long");
  if (args.password.length < 3) throw new UserInputError("Password too short");
  const passwordHash = await bcrypt.hash(args.password, 10);
  const users = await context.prisma.user.findMany({ select: { id: true } });
  const user: UserPayload = await context.prisma.user
    .create({
      data: { username: args.username, passwordHash },
      select: userSelect
    })
    .catch(() => {
      throw new UserInputError("Username taken");
    });
  io.to(users.map(u => u.id)).emit("USER_CREATED", resolveUser(user));
  return user;
}

export async function updateUser(
  _: unknown,
  args: UserArgs,
  context: Context
): Promise<UserPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  if (!args.username) throw new UserInputError("Username not provided");
  if (!args.password) throw new UserInputError("Password not provided");
  if (args.username.length < 3) throw new UserInputError("Username too short");
  if (args.username.length > 10) throw new UserInputError("Username too long");
  if (args.password.length < 8) throw new UserInputError("Password too short");
  const passwordHash = await bcrypt.hash(args.password, 10);
  const user: UserPayload = await context.prisma.user
    .update({
      where: { id: context.user.id },
      data: { username: args.username, passwordHash },
      select: userSelect
    })
    .catch(() => {
      throw new UserInputError("Username taken");
    });
  io.emit("USER_UPDATED", resolveUser(user));
  return user;
}

export async function deleteUser(
  _: unknown,
  __: unknown,
  context: Context
): Promise<UserPayload> {
  if (!context.user) throw new AuthenticationError("Not logged in");
  await context.prisma.message.deleteMany({
    where: { userId: context.user.id }
  });
  for (const _chat of await context.prisma.chat.findMany({
    where: {
      OR: [
        { admin: { id: context.user.id } },
        { users: { some: { id: context.user.id } } }
      ]
    },
    select: { ...chatSelect, messages: { select: messageSelect } }
  })) {
    if (_chat.users.length === 1) {
      await context.prisma.message.deleteMany({ where: { chatId: _chat.id } });
      const chat: ChatPayload = await context.prisma.chat.delete({
        where: { id: _chat.id },
        select: chatSelect
      });
      io.to(chat.admin.id)
        .to(chat.users.map(u => u.id))
        .emit("CHAT_DELETED", resolveChat(chat));
    } else if (_chat.admin.id === context.user.id) {
      const { id } = _chat.users[0];
      const chat: ChatPayload = await context.prisma.chat.update({
        where: { id: _chat.id },
        data: {
          admin: { connect: { id } },
          users: { disconnect: { id } },
          message: {
            connect: { id: _chat.messages[_chat.messages.length - 1].id }
          }
        },
        select: chatSelect
      });
      io.to(chat.admin.id)
        .to(chat.users.map(u => u.id))
        .emit("CHAT_UPDATED", resolveChat(chat));
    } else {
      const chat: ChatPayload = await context.prisma.chat.update({
        where: { id: _chat.id },
        data: {
          users: { disconnect: { id: context.user.id } },
          message: {
            connect: { id: _chat.messages[_chat.messages.length - 1].id }
          }
        },
        select: chatSelect
      });
      io.to(chat.admin.id)
        .to(chat.users.map(u => u.id))
        .emit("CHAT_UPDATED", resolveChat(chat));
    }
  }
  const user: UserPayload = await context.prisma.user.delete({
    where: { id: context.user.id },
    select: userSelect
  });
  io.emit("USER_DELETED", resolveUser(user));
  return user;
}
