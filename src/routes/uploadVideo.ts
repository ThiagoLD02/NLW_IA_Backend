import { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart"; // eh utilizado para upload de arquivos
import path from "path";
import { randomUUID } from "crypto";
import { promisify } from "util"; // poder utilizar async await em uma funcao q n suporta nativamente
import { pipeline } from "stream";
import fs from "node:fs"; // filestream
import { prisma } from "../lib/prisma";
import { log } from "console";

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    },
  });

  app.post("/videos", async (request, reply) => {
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ error: "Missing file input." });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return reply
        .status(400)
        .send({ error: "Invalid input type, please upload a MP3." });
    }

    // so pra tirar a extensao do nome
    const fileBaseName = path.basename(data.filename, extension);

    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDestination = path.resolve(
      __dirname,
      "../../tmp",
      fileUploadName
    );

    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    });

    return {
      video,
    };
  });
}
