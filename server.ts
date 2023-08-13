import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { ConnectMongoDb, getCachedDb } from "./mongodb";
import { typeDefs, resolvers } from "./graphql/schema";
import { Collection } from "mongodb";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

const port = process.env.PORT || 5000; // Specify your desired port number here

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  // Connect to MongoDB
  ConnectMongoDb();

  await server.start();

  app.use(
    "/api/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async () => {
        const db = getCachedDb();
        const usersCollection: Collection = db.collection("users");
        const mlhFellowshipCollection: Collection =
          db.collection("mlh-fellowship");
        return { usersCollection, mlhFellowshipCollection };
      },
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at on Port`, port);
}

startServer().catch((err) => console.error(err));
