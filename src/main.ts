import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { env } from "./env";
import { createContext } from "./server/context";
import { appRouter } from "./server/router/_app";

(async () => {
  try {
    const server = await fastify({ maxParamLength: 5000 });
    await server.register(cors, { origin: "http://localhost:5173" });
    await server.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: {
        router: appRouter,
        createContext,
      },
    });
    await server.listen({ port: env.PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${env.PORT}/trpc`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
