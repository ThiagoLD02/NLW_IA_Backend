import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllVideosRoute(app: FastifyInstance) {
  app.get("/videos", async () => await prisma.video.findMany());
}
