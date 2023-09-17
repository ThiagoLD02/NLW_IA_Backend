import "dotenv/config"; // biblioteca para poder ler arquivos .env, node atual (18) nao faz isso nativamente
import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // process.env possui todos os campos dentro do .env
});
