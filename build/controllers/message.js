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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.createMessage = exports.resolveMessage = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var __1 = require("..");
var types_1 = require("./types");
var user_1 = require("./user");
var chat_1 = require("./chat");
function resolveMessage(message) {
    return {
        id: message.id,
        text: message.text,
        time: message.time,
        forwarded: message.forwarded,
        chatId: message.chatId,
        user: message.user ? user_1.resolveUser(message.user) : null,
        reply: message.reply
            ? {
                id: message.reply.id,
                text: message.reply.text,
                user: user_1.resolveUser(message.reply.user),
                __typename: "Message"
            }
            : null,
        __typename: "Message"
    };
}
exports.resolveMessage = resolveMessage;
function createMessage(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var message, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.text)
                        throw new apollo_server_express_1.UserInputError("Text not provided");
                    if (!args.chatId)
                        throw new apollo_server_express_1.UserInputError("Chat id not provided");
                    if (!args.text.length)
                        throw new apollo_server_express_1.UserInputError("Text cannot be empty");
                    if (args.text.length > 150)
                        throw new apollo_server_express_1.UserInputError("Text must be less than 150 characters");
                    if (!args.forwarded)
                        args.forwarded = false;
                    if (!args.messageId) return [3 /*break*/, 2];
                    return [4 /*yield*/, context.prisma.message.create({
                            data: {
                                text: args.text,
                                forwarded: args.forwarded,
                                latest: { connect: { id: args.chatId } },
                                chat: { connect: { id: args.chatId } },
                                user: { connect: { id: context.user.id } },
                                reply: { connect: { id: args.messageId } }
                            },
                            select: types_1.messageSelect
                        })];
                case 1:
                    message = _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!args.notification) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.prisma.message.create({
                            data: {
                                text: args.text,
                                forwarded: args.forwarded,
                                latest: { connect: { id: args.chatId } },
                                chat: { connect: { id: args.chatId } }
                            },
                            select: types_1.messageSelect
                        })];
                case 3:
                    message = _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, context.prisma.message.create({
                        data: {
                            text: args.text,
                            forwarded: args.forwarded,
                            latest: { connect: { id: args.chatId } },
                            chat: { connect: { id: args.chatId } },
                            user: { connect: { id: context.user.id } }
                        },
                        select: types_1.messageSelect
                    })];
                case 5:
                    message = _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, context.prisma.chat.findUnique({
                        where: { id: args.chatId },
                        select: types_1.chatSelect
                    })];
                case 7:
                    chat = (_a.sent());
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("MESSAGE_CREATED", resolveMessage(message));
                    return [2 /*return*/, message];
            }
        });
    });
}
exports.createMessage = createMessage;
function updateMessage(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var message, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.messageId)
                        throw new apollo_server_express_1.UserInputError("Message id not provided");
                    if (!args.text)
                        throw new apollo_server_express_1.UserInputError("Text not provided");
                    if (!args.text.length)
                        throw new apollo_server_express_1.UserInputError("Text cannot be empty");
                    if (args.text.length > 150)
                        throw new apollo_server_express_1.UserInputError("Text must be less than 150 characters");
                    return [4 /*yield*/, context.prisma.message
                            .update({
                            where: { id: args.messageId },
                            data: { text: args.text },
                            select: types_1.messageSelect
                        })
                            .catch(function () {
                            throw new apollo_server_express_1.UserInputError("Message not found");
                        })];
                case 1:
                    message = _a.sent();
                    return [4 /*yield*/, context.prisma.chat.findFirst({
                            where: { messages: { some: { id: args.messageId } } },
                            select: types_1.chatSelect
                        })];
                case 2:
                    chat = (_a.sent());
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("MESSAGE_UPDATED", resolveMessage(message));
                    return [2 /*return*/, message];
            }
        });
    });
}
exports.updateMessage = updateMessage;
function deleteMessage(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _chat, message, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.messageId)
                        throw new apollo_server_express_1.UserInputError("Message id not provided");
                    return [4 /*yield*/, context.prisma.chat.findFirst({
                            where: { messages: { some: { id: args.messageId } } },
                            select: __assign(__assign({}, types_1.chatSelect), { messages: { select: types_1.messageSelect } })
                        })];
                case 1:
                    _chat = (_a.sent());
                    return [4 /*yield*/, context.prisma.message.delete({
                            where: { id: args.messageId },
                            select: types_1.messageSelect
                        })];
                case 2:
                    message = _a.sent();
                    if (!(_chat.message.id === args.messageId)) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: _chat.id },
                            data: {
                                message: {
                                    connect: { id: _chat.messages[_chat.messages.length - 2].id }
                                }
                            },
                            select: types_1.chatSelect
                        })];
                case 3:
                    chat = _a.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", chat_1.resolveChat(chat));
                    _a.label = 4;
                case 4:
                    __1.io.to(_chat.admin.id)
                        .to(_chat.users.map(function (u) { return u.id; }))
                        .emit("MESSAGE_DELETED", resolveMessage(message));
                    return [2 /*return*/, message];
            }
        });
    });
}
exports.deleteMessage = deleteMessage;
