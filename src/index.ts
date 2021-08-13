import type { UserPayload } from "./controllers/types";
import express from "express";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { Server } from "socket.io";
import typeDefs from "./config/typeDefs";
import resolvers from "./config/resolvers";
import context from "./config/context";
import { authorize } from "./config/context";

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const apolloServer = new ApolloServer({ schema, context });

export const io = new Server(httpServer);

(async function () {
  io.on("connection", socket => {
    socket.on("AUTHORIZATION", async (authorization: string) => {
      const user = (await authorize(authorization)) as UserPayload;
      socket.join(user.id);
    });
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use("/assets", express.static("dist/assets"));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: "dist" });
  });

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
