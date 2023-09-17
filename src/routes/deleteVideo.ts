import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function deleteVideoRoute(app: FastifyInstance) {
  app.delete("/delete", async (request, response) => {
    const id = request.body.id;
    const found = await prisma.video.findUnique({ where: { id: id } });
    if (!found) {
      return response.status(400).send("File not found!");
    }

    const deletedVideo = await prisma.video.delete({
      where: {
        id: found.id,
      },
    });

    return {
      deletedVideo,
    };
  });
}
