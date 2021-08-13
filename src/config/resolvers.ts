import type { Context } from "../config/context";
import type { MessagePayload } from "../controllers/types";
import {
  findUser,
  findUsers,
  login,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user";
import {
  findChats,
  createChat,
  leaveChat,
  renameChat,
  changeAdmin,
  addUsers,
  removeUsers,
  deleteChat
} from "../controllers/chat";
import {
  createMessage,
  updateMessage,
  deleteMessage
} from "../controllers/message";

const resolvers = {
  Message: {
    time: (message: MessagePayload, _: unknown, context: Context): string =>
      message.time.toLocaleString("en-US", {
        timeZone: context.timezone,
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })
  },
  Query: { findUser, findUsers, findChats },
  Mutation: {
    login,
    createUser,
    updateUser,
    deleteUser,
    createChat,
    leaveChat,
    renameChat,
    changeAdmin,
    addUsers,
    removeUsers,
    deleteChat,
    createMessage,
    updateMessage,
    deleteMessage
  }
};

export default resolvers;
