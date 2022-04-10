import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from 'server/graphql/typeDefs';
import resolvers from 'server/graphql/resolvers';
import AppContext from 'server/types/appContext';

const isDev = process.env.NODE_ENV === 'development';

const prisma = new PrismaClient();

async function init() {
  const app = express();

  app.use(bodyParser.json());
  app.get('/status', (_req, res) => res.json({ status: 'ok' }));

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
    }),
    introspection: true,
    playground: isDev,
    tracing: isDev,
    // Context is passed down to every resolver
    async context(): Promise<AppContext> {
      return { prisma };
    },
    plugins: [
      // Use this plugin to make sure server shuts down gracefully
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  } as Config<ExpressContext>);

  const port = process.env.PORT || 4000;
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port }, resolve as () => void));
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
}

init();
