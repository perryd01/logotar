import fastify from "fastify";
import { PrismaClient } from "database";
import { z } from "zod";

declare let PKG: {
  version?: string;
};

const assetParamsSchema = z.object({
  group: z.string(),
  team: z.string(),
  name: z.string(),
});

const app = async () => {
  const app = fastify();

  await app.register(import("@fastify/rate-limit"), {
    max: 10000,
    timeWindow: "1 minute",
  });

  const prisma = new PrismaClient();
  const startTime = Date.now();

  app.get("/", (_, reply) => {
    reply.send(`logotar cdn v${PKG.version ?? "???"}`);
  });

  app.get("/health", (_, reply) => {
    reply.send(`ok, uptime: ${(Date.now() - startTime) / 1000} seconds`);
  });

  app.get("/count", async (_, reply) => {
    const count = await prisma.logo.count();
    reply.send({ count });
  });

  app.get("/assets/:group/:team/:name.svg", async (req, reply) => {
    const { group, team, name } = req.params as z.infer<
      typeof assetParamsSchema
    >;

    const result = assetParamsSchema.safeParse({ group, team, name });

    if (!result.success) {
      reply.status(400);
      reply.send(result.error);
      return;
    }

    const logo = await prisma.logo.findFirst({
      where: {
        name,
        Team: {
          slug: team,
          Group: {
            slug: group,
          },
        },
      },
    });

    if (!logo) {
      reply.status(404);
      return;
    }

    const content = logo.content.toString();

    reply.header("Content-Type", "image/svg+xml");
    reply.header("Content-Length", content.length.toString());
    reply.send(content);
  });

  // @ts-expect-error vite env
  if (import.meta.env.PROD) app.listen({ port: 3000 });

  return app;
};

export const viteNodeApp = app();
