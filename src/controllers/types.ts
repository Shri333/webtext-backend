import { Prisma } from "@prisma/client";

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true
});

const userPayload = Prisma.validator<Prisma.UserArgs>()({ select: userSelect });

export type UserPayload = Prisma.UserGetPayload<typeof userPayload>;

export type GraphQLUser = {
  id: string;
  username: string;
  __typename: "User";
};

export const messageSelect = Prisma.validator<Prisma.MessageSelect>()({
  id: true,
  text: true,
  time: true,
  forwarded: true,
  chatId: true,
  user: { select: userSelect },
  reply: { select: { id: true, text: true, user: { select: userSelect } } }
});

const messagePayload = Prisma.validator<Prisma.MessageArgs>()({
  select: messageSelect
});

export type MessagePayload = Prisma.MessageGetPayload<typeof messagePayload>;

export type GraphQLMessage = {
  id: string;
  text: string;
  time: Date;
  forwarded: boolean;
  chatId: string;
  user: GraphQLUser | null;
  reply: {
    id: string;
    text: string;
    user: GraphQLUser;
    __typename: "Message";
  } | null;
  __typename: "Message";
};

export const chatSelect = Prisma.validator<Prisma.ChatSelect>()({
  id: true,
  name: true,
  admin: { select: userSelect },
  users: { select: userSelect },
  message: { select: messageSelect }
});

const chatPayload = Prisma.validator<Prisma.ChatArgs>()({
  select: chatSelect
});

export type ChatPayload = Prisma.ChatGetPayload<typeof chatPayload>;

export type GraphQLChat = {
  id: string;
  name: string | null;
  admin: GraphQLUser;
  users: GraphQLUser[];
  message: GraphQLMessage | null;
  messages?: GraphQLMessage[];
  __typename: "Chat";
};
