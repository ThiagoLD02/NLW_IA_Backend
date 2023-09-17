import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";
import { createReadStream } from "fs";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { temperature, template, videoId } = bodySchema.parse(request.params);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: "Video transcription was not genereted yet." });
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    // chamada pra IA

    return {
      videoId,
      template,
      temperature,
    };
  });
}
