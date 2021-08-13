"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChat = exports.removeUsers = exports.addUsers = exports.changeAdmin = exports.renameChat = exports.leaveChat = exports.createChat = exports.findChats = exports.resolveChat = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var __1 = require("..");
var types_1 = require("./types");
var user_1 = require("./user");
var message_1 = require("./message");
function resolveChat(chat) {
    return {
        id: chat.id,
        name: chat.name,
        admin: user_1.resolveUser(chat.admin),
        users: chat.users.map(function (u) { return user_1.resolveUser(u); }),
        message: chat.message
            ? message_1.resolveMessage(chat.message)
            : null,
        messages: chat.messages
            ? chat.messages.map(function (m) { return message_1.resolveMessage(m); })
            : undefined,
        __typename: "Chat"
    };
}
exports.resolveChat = resolveChat;
function findChats(_, __, context) {
    if (!context.user)
        throw new apollo_server_express_1.AuthenticationError("Not logged in");
    return context.prisma.chat.findMany({
        where: {
            OR: [
                { admin: { id: context.user.id } },
                { users: { some: { id: context.user.id } } }
            ]
        },
        orderBy: { id: "asc" },
        select: __assign(__assign({}, types_1.chatSelect), { messages: { orderBy: { time: "desc" }, select: types_1.messageSelect } })
    });
}
exports.findChats = findChats;
function createChat(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var chats, __chat, _chat, date, month, day, year, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.userIds)
                        throw new apollo_server_express_1.UserInputError("User ids not provided");
                    if (!args.userIds.length)
                        throw new apollo_server_express_1.UserInputError("Cannot create chat with zero users");
                    return [4 /*yield*/, context.prisma.chat.findMany({
                            where: {
                                admin: {
                                    OR: __spreadArray([{ id: context.user.id }], args.userIds.map(function (id) { return ({ id: id }); }))
                                },
                                users: { every: { id: { in: __spreadArray([context.user.id], args.userIds) } } }
                            },
                            select: { admin: { select: { id: true } }, users: { select: { id: true } } }
                        })];
                case 1:
                    chats = _a.sent();
                    __chat = chats.find(function (c) {
                        var _everyone = __spreadArray([c.admin.id], c.users.map(function (u) { return u.id; })).sort();
                        var everyone = __spreadArray([
                            context.user.id
                        ], args.userIds).sort();
                        if (_everyone.length !== everyone.length)
                            return false;
                        for (var i = 0; i < _everyone.length; i++)
                            if (_everyone[i] !== everyone[i])
                                return false;
                        return true;
                    });
                    if (__chat)
                        throw new apollo_server_express_1.UserInputError("Chat already exists");
                    return [4 /*yield*/, context.prisma.chat.create({
                            data: {
                                admin: { connect: { id: context.user.id } },
                                users: { connect: args.userIds.map(function (id) { return ({ id: id }); }) }
                            }
                        })];
                case 2:
                    _chat = _a.sent();
                    date = new Date();
                    month = date.getMonth() + 1;
                    day = date.getDate();
                    year = date.getFullYear();
                    return [4 /*yield*/, context.prisma.message.create({
                            data: {
                                text: context.user.username + " created this chat on " + month + "/" + day + "/" + year,
                                latest: { connect: { id: _chat.id } },
                                chat: { connect: { id: _chat.id } }
                            }
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, context.prisma.chat.findUnique({
                            where: { id: _chat.id },
                            select: __assign(__assign({}, types_1.chatSelect), { messages: { select: types_1.messageSelect } })
                        })];
                case 4:
                    chat = (_a.sent());
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_CREATED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.createChat = createChat;
function leaveChat(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _chat, chat, id, chat_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    return [4 /*yield*/, context.prisma.chat.findUnique({
                            where: { id: args.chatId },
                            include: { admin: { select: types_1.userSelect }, users: { select: types_1.userSelect } }
                        })];
                case 1:
                    _chat = _a.sent();
                    if (!_chat)
                        throw new apollo_server_express_1.UserInputError("No chat found");
                    if (!(_chat.admin.id === context.user.id)) return [3 /*break*/, 3];
                    id = _chat.users[0].id;
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: args.chatId },
                            data: {
                                admin: { connect: { id: id } },
                                users: { disconnect: { id: id } }
                            },
                            select: types_1.chatSelect
                        })];
                case 2:
                    chat = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, context.prisma.chat.update({
                        where: { id: args.chatId },
                        data: { users: { disconnect: { id: context.user.id } } },
                        select: types_1.chatSelect
                    })];
                case 4:
                    chat = _a.sent();
                    _a.label = 5;
                case 5:
                    if (!!chat.users.length) return [3 /*break*/, 8];
                    return [4 /*yield*/, context.prisma.message.deleteMany({ where: { chatId: _chat.id } })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, context.prisma.chat.delete({
                            where: { id: _chat.id },
                            select: types_1.chatSelect
                        })];
                case 7:
                    chat_1 = _a.sent();
                    __1.io.to(chat_1.admin.id)
                        .to(context.user.id)
                        .emit("CHAT_DELETED", resolveChat(chat_1));
                    return [2 /*return*/, chat_1];
                case 8:
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", resolveChat(chat));
                    __1.io.to(context.user.id).emit("CHAT_DELETED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.leaveChat = leaveChat;
function renameChat(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    if (!args.name)
                        throw new apollo_server_express_1.UserInputError("Chat name not provided");
                    if (args.name.length > 25)
                        throw new apollo_server_express_1.UserInputError("Chat name must be less than 25 characters");
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: args.chatId },
                            data: { name: args.name },
                            select: types_1.chatSelect
                        })];
                case 1:
                    chat = _a.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.renameChat = renameChat;
function changeAdmin(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    if (!args.userId)
                        throw new apollo_server_express_1.UserInputError("User id not provided");
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: args.chatId },
                            data: {
                                admin: { connect: { id: args.userId } },
                                users: {
                                    disconnect: { id: args.userId },
                                    connect: { id: context.user.id }
                                }
                            },
                            select: types_1.chatSelect
                        })];
                case 1:
                    chat = _a.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .to(context.user.id)
                        .emit("CHAT_UPDATED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.changeAdmin = changeAdmin;
function addUsers(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _chat, chat, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    if (!args.userIds)
                        throw new apollo_server_express_1.UserInputError("User id not provided");
                    if (!args.userIds.length)
                        throw new apollo_server_express_1.UserInputError("Cannot add zero users");
                    return [4 /*yield*/, context.prisma.chat.findUnique({
                            where: { id: args.chatId },
                            select: { users: { select: types_1.userSelect } }
                        })];
                case 1:
                    _chat = (_a.sent());
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: args.chatId },
                            data: { users: { connect: args.userIds.map(function (id) { return ({ id: id }); }) } },
                            select: types_1.chatSelect
                        })];
                case 2:
                    chat = _a.sent();
                    return [4 /*yield*/, context.prisma.message.findMany({
                            where: { chatId: chat.id },
                            select: types_1.messageSelect
                        })];
                case 3:
                    messages = _a.sent();
                    __1.io.to(chat.admin.id)
                        .to(_chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", resolveChat(chat));
                    __1.io.to(chat.users.map(function (u) { return u.id; }))
                        .except(_chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_CREATED", resolveChat(__assign(__assign({}, chat), { messages: messages })));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.addUsers = addUsers;
function removeUsers(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _chat, chat, chat_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    if (!args.userIds)
                        throw new apollo_server_express_1.UserInputError("User id not provided");
                    if (!args.userIds.length)
                        throw new apollo_server_express_1.UserInputError("Cannot remove zero users");
                    return [4 /*yield*/, context.prisma.chat.findUnique({
                            where: { id: args.chatId },
                            include: { admin: { select: types_1.userSelect }, users: { select: types_1.userSelect } }
                        })];
                case 1:
                    _chat = _a.sent();
                    if (!_chat)
                        throw new apollo_server_express_1.UserInputError("No chat found");
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: args.chatId },
                            data: { users: { disconnect: args.userIds.map(function (id) { return ({ id: id }); }) } },
                            select: types_1.chatSelect
                        })];
                case 2:
                    chat = _a.sent();
                    if (!!chat.users.length) return [3 /*break*/, 5];
                    return [4 /*yield*/, context.prisma.message.deleteMany({ where: { chatId: _chat.id } })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, context.prisma.chat.delete({
                            where: { id: _chat.id },
                            select: types_1.chatSelect
                        })];
                case 4:
                    chat_2 = _a.sent();
                    __1.io.to(chat_2.admin.id)
                        .to(args.userIds)
                        .emit("CHAT_DELETED", resolveChat(chat_2));
                    return [2 /*return*/, chat_2];
                case 5:
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", resolveChat(chat));
                    __1.io.to(args.userIds).emit("CHAT_DELETED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.removeUsers = removeUsers;
function deleteChat(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    return [4 /*yield*/, context.prisma.message.deleteMany({ where: { chatId: args.chatId } })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, context.prisma.chat.delete({
                            where: { id: args.chatId },
                            select: types_1.chatSelect
                        })];
                case 2:
                    chat = _a.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_DELETED", resolveChat(chat));
                    return [2 /*return*/, chat];
            }
        });
    });
}
exports.deleteChat = deleteChat;
