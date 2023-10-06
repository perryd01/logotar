import fastify from "fastify";
import { PrismaClient } from "database";
import { z } from "zod";
import sharp from "sharp";
import { MIMETYPES } from "./mime";

declare let PKG: {
  version?: string;
};

const assetParamsSchema = z.object({
  group: z.string(),
  team: z.string(),
  name: z.string(),
  format: z.enum(["svg", "png", "webp"]).default("svg"),
});

const assetQuerySchema = z.object({
  size: z.coerce.number().min(32).max(2400).default(320),
});

const app = async () => {
  const app = fastify({
    logger: true,
  });

  await app.register(import("@fastify/rate-limit"), {
    max: 10000,
    timeWindow: "1 minute",
  });

  const prisma = new PrismaClient();
  const startTime = Date.now();

  app.get("/", (_, reply) => {
    reply.send(`logotar cdn v${PKG.version ?? "???"}`);
  });

  app.get("/health", (req, reply) => {
    req.log.info("health check at %s", new Date().toISOString());
    reply.send(`ok, uptime: ${(Date.now() - startTime) / 1000} seconds`);
  });

  app.get("/assets/:group/:team/:name.:format", async (req, reply) => {
    const params = req.params as z.infer<typeof assetParamsSchema>;
    const query = req.query as z.infer<typeof assetQuerySchema>;

    const paramsResult = assetParamsSchema.safeParse(params);
    const queryResult = assetQuerySchema.safeParse(query);

    if (!paramsResult.success) {
      req.log.error(paramsResult.error);
      reply.status(400);
      reply.send("invalid params");
      return;
    }

    if (!queryResult.success) {
      req.log.error(queryResult.error);
      reply.status(400);
      reply.send("invalid query");
      return;
    }

    const logo = await prisma.logo.findFirst({
      where: {
        name: params.name,
        Team: {
          slug: params.team,
          Group: {
            slug: params.group,
          },
        },
      },
    });

    if (!logo) {
      reply.status(404);
      reply.send("Not found");
      return;
    }

    reply.header("Cache-Control", `public, max-age=${5 * 60}`);

    const content = logo.content.toString();

    if (paramsResult.data.format === "svg") {
      reply.header("Content-Type", "image/svg+xml");
      reply.header("Content-Length", content.length.toString());
      reply.send(content);
      return;
    }

    const start = Date.now();
    const contentBuffer = await sharp(Buffer.from(content))
      .toFormat(paramsResult.data.format)
      .resize({
        width: queryResult.data.size,
        fit: "contain",
      })
      .timeout({
        seconds: 2,
      })
      .toBuffer();
    const end = Date.now();
    req.log.debug(
      `sharp took ${end - start}ms to transform ${logo.name} to ${
        paramsResult.data.format
      } at ${queryResult.data.size}px`
    );

    reply.header("Content-Type", MIMETYPES[paramsResult.data.format]);
    reply.header("Content-Length", contentBuffer.length.toString());
    reply.send(contentBuffer);
  });

  // @ts-expect-error vite env
  if (import.meta.env.PROD) app.listen({ port: 3000 });

  return app;
};

export const viteNodeApp = app();
