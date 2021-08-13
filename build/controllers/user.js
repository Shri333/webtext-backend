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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.login = exports.findUsers = exports.findUser = exports.resolveUser = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var __1 = require("..");
var types_1 = require("./types");
var chat_1 = require("./chat");
function resolveUser(user) {
    return __assign(__assign({}, user), { __typename: "User" });
}
exports.resolveUser = resolveUser;
function findUser(_, __, context) {
    if (context.user)
        return context.user;
    return null;
}
exports.findUser = findUser;
function findUsers(_, __, context) {
    if (!context.user)
        throw new apollo_server_express_1.AuthenticationError("Not logged in");
    return context.prisma.user.findMany({
        where: { id: { not: context.user.id } },
        select: types_1.userSelect
    });
}
exports.findUsers = findUsers;
function login(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var user, passwordsMatch, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!args.username)
                        throw new apollo_server_express_1.UserInputError("Username not provided");
                    if (!args.password)
                        throw new apollo_server_express_1.UserInputError("Password not provided");
                    return [4 /*yield*/, context.prisma.user.findUnique({
                            where: { username: args.username }
                        })];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new apollo_server_express_1.AuthenticationError("User does not exist");
                    return [4 /*yield*/, bcrypt_1.default.compare(args.password, user.passwordHash)];
                case 2:
                    passwordsMatch = _a.sent();
                    if (!passwordsMatch)
                        throw new apollo_server_express_1.AuthenticationError("Incorrect password");
                    token = { id: user.id, username: user.username };
                    return [2 /*return*/, jsonwebtoken_1.default.sign(token, process.env.JWT_KEY, {
                            expiresIn: 60 * 60 * 24 * 14
                        })];
            }
        });
    });
}
exports.login = login;
function createUser(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash, users, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!args.username)
                        throw new apollo_server_express_1.UserInputError("Username not provided");
                    if (!args.password)
                        throw new apollo_server_express_1.UserInputError("Password not provided");
                    if (args.username.length < 3)
                        throw new apollo_server_express_1.UserInputError("Username too short");
                    if (args.username.length > 7)
                        throw new apollo_server_express_1.UserInputError("Username too long");
                    if (args.password.length < 3)
                        throw new apollo_server_express_1.UserInputError("Password too short");
                    return [4 /*yield*/, bcrypt_1.default.hash(args.password, 10)];
                case 1:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, context.prisma.user.findMany({ select: { id: true } })];
                case 2:
                    users = _a.sent();
                    return [4 /*yield*/, context.prisma.user
                            .create({
                            data: { username: args.username, passwordHash: passwordHash },
                            select: types_1.userSelect
                        })
                            .catch(function () {
                            throw new apollo_server_express_1.UserInputError("Username taken");
                        })];
                case 3:
                    user = _a.sent();
                    __1.io.to(users.map(function (u) { return u.id; })).emit("USER_CREATED", resolveUser(user));
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.createUser = createUser;
function updateUser(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    if (!args.username)
                        throw new apollo_server_express_1.UserInputError("Username not provided");
                    if (!args.password)
                        throw new apollo_server_express_1.UserInputError("Password not provided");
                    if (args.username.length < 3)
                        throw new apollo_server_express_1.UserInputError("Username too short");
                    if (args.username.length > 10)
                        throw new apollo_server_express_1.UserInputError("Username too long");
                    if (args.password.length < 8)
                        throw new apollo_server_express_1.UserInputError("Password too short");
                    return [4 /*yield*/, bcrypt_1.default.hash(args.password, 10)];
                case 1:
                    passwordHash = _a.sent();
                    return [4 /*yield*/, context.prisma.user
                            .update({
                            where: { id: context.user.id },
                            data: { username: args.username, passwordHash: passwordHash },
                            select: types_1.userSelect
                        })
                            .catch(function () {
                            throw new apollo_server_express_1.UserInputError("Username taken");
                        })];
                case 2:
                    user = _a.sent();
                    __1.io.emit("USER_UPDATED", resolveUser(user));
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.updateUser = updateUser;
function deleteUser(_, __, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, _chat, chat, id, chat, chat, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!context.user)
                        throw new apollo_server_express_1.AuthenticationError("Not logged in");
                    return [4 /*yield*/, context.prisma.message.deleteMany({
                            where: { userId: context.user.id }
                        })];
                case 1:
                    _b.sent();
                    _i = 0;
                    return [4 /*yield*/, context.prisma.chat.findMany({
                            where: {
                                OR: [
                                    { admin: { id: context.user.id } },
                                    { users: { some: { id: context.user.id } } }
                                ]
                            },
                            select: __assign(__assign({}, types_1.chatSelect), { messages: { select: types_1.messageSelect } })
                        })];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 11];
                    _chat = _a[_i];
                    if (!(_chat.users.length === 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, context.prisma.message.deleteMany({ where: { chatId: _chat.id } })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, context.prisma.chat.delete({
                            where: { id: _chat.id },
                            select: types_1.chatSelect
                        })];
                case 5:
                    chat = _b.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_DELETED", chat_1.resolveChat(chat));
                    return [3 /*break*/, 10];
                case 6:
                    if (!(_chat.admin.id === context.user.id)) return [3 /*break*/, 8];
                    id = _chat.users[0].id;
                    return [4 /*yield*/, context.prisma.chat.update({
                            where: { id: _chat.id },
                            data: {
                                admin: { connect: { id: id } },
                                users: { disconnect: { id: id } },
                                message: {
                                    connect: { id: _chat.messages[_chat.messages.length - 1].id }
                                }
                            },
                            select: types_1.chatSelect
                        })];
                case 7:
                    chat = _b.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", chat_1.resolveChat(chat));
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, context.prisma.chat.update({
                        where: { id: _chat.id },
                        data: {
                            users: { disconnect: { id: context.user.id } },
                            message: {
                                connect: { id: _chat.messages[_chat.messages.length - 1].id }
                            }
                        },
                        select: types_1.chatSelect
                    })];
                case 9:
                    chat = _b.sent();
                    __1.io.to(chat.admin.id)
                        .to(chat.users.map(function (u) { return u.id; }))
                        .emit("CHAT_UPDATED", chat_1.resolveChat(chat));
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 3];
                case 11: return [4 /*yield*/, context.prisma.user.delete({
                        where: { id: context.user.id },
                        select: types_1.userSelect
                    })];
                case 12:
                    user = _b.sent();
                    __1.io.emit("USER_DELETED", resolveUser(user));
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.deleteUser = deleteUser;
