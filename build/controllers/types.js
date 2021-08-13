"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSelect = exports.messageSelect = exports.userSelect = void 0;
var client_1 = require("@prisma/client");
exports.userSelect = client_1.Prisma.validator()({
    id: true,
    username: true
});
var userPayload = client_1.Prisma.validator()({ select: exports.userSelect });
exports.messageSelect = client_1.Prisma.validator()({
    id: true,
    text: true,
    time: true,
    forwarded: true,
    chatId: true,
    user: { select: exports.userSelect },
    reply: { select: { id: true, text: true, user: { select: exports.userSelect } } }
});
var messagePayload = client_1.Prisma.validator()({
    select: exports.messageSelect
});
exports.chatSelect = client_1.Prisma.validator()({
    id: true,
    name: true,
    admin: { select: exports.userSelect },
    users: { select: exports.userSelect },
    message: { select: exports.messageSelect }
});
var chatPayload = client_1.Prisma.validator()({
    select: exports.chatSelect
});
