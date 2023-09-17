import fastify from "fastify";
import { getAllPromptsRoute } from "./routes/getAllPrompts";
import { getAllVideosRoute } from "./routes/getAllVideos";
import { uploadVideoRoute } from "./routes/uploadVideo";
import { deleteVideoRoute } from "./routes/deleteVideo";
import { createTranscriptionVideoRoute } from "./routes/createTransciption";

const app = fastify();

// todas as rotas devem ser async para usar o register
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionVideoRoute);
app.register(getAllVideosRoute);
app.register(deleteVideoRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
