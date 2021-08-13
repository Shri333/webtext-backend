import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Chat {
    id: ID!
    name: String
    admin: User!
    users: [User!]!
    message: Message
    messages: [Message!]!
  }

  type Message {
    id: ID!
    text: String!
    time: String!
    forwarded: Boolean!
    chatId: ID!
    user: User
    reply: Message
  }

  type Query {
    findUser: User
    findUsers: [User!]!
    findChats: [Chat!]!
  }

  type Mutation {
    login(username: String!, password: String!): String!
    createUser(username: String!, password: String!): User!
    updateUser(username: String!, password: String!): User!
    deleteUser: User!
    createChat(userIds: [ID!]!): Chat!
    leaveChat(chatId: ID!): Chat!
    renameChat(chatId: ID!, name: String!): Chat!
    changeAdmin(chatId: ID!, userId: ID!): Chat!
    addUsers(chatId: ID!, userIds: [ID!]!): Chat!
    removeUsers(chatId: ID!, userIds: [ID!]!): Chat!
    deleteChat(chatId: ID!): Chat!
    createMessage(
      text: String!
      forwarded: Boolean
      chatId: ID!
      notification: Boolean
      socketId: ID
      messageId: ID
    ): Message!
    updateMessage(messageId: ID!, text: String!): Message!
    deleteMessage(messageId: ID!): Message!
  }
`;

export default typeDefs;
