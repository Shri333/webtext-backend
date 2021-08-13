"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var chat_1 = require("../controllers/chat");
var message_1 = require("../controllers/message");
var resolvers = {
    Message: {
        time: function (message, _, context) {
            return message.time.toLocaleString("en-US", {
                timeZone: context.timezone,
                hour: "numeric",
                minute: "numeric",
                hour12: true
            });
        }
    },
    Query: { findUser: user_1.findUser, findUsers: user_1.findUsers, findChats: chat_1.findChats },
    Mutation: {
        login: user_1.login,
        createUser: user_1.createUser,
        updateUser: user_1.updateUser,
        deleteUser: user_1.deleteUser,
        createChat: chat_1.createChat,
        leaveChat: chat_1.leaveChat,
        renameChat: chat_1.renameChat,
        changeAdmin: chat_1.changeAdmin,
        addUsers: chat_1.addUsers,
        removeUsers: chat_1.removeUsers,
        deleteChat: chat_1.deleteChat,
        createMessage: message_1.createMessage,
        updateMessage: message_1.updateMessage,
        deleteMessage: message_1.deleteMessage
    }
};
exports.default = resolvers;
