import "reflect-metadata";
import { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import app from "../src/app.js";
import { initializeDataSource } from "../src/config/data-source.js";

const handler = serverless(app);

export default async (req: VercelRequest, res: VercelResponse) => {
  await initializeDataSource();
  return handler(req, res);
};
