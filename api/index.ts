require("reflect-metadata");
import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
import serverless from "serverless-http";
import { initializeDataSource } from "../src/config/data-source";
import app from "../src/app";

dotenv.config();

let initialized = false;
const handler = serverless(app);

export default async function main(req: VercelRequest, res: VercelResponse) {
  try {
    if (!initialized) {
      await initializeDataSource();
      initialized = true;
      console.log("✅ Database connected (Vercel)");
    }

    return handler(req, res);
  } catch (error: any) {
    console.error("❌ Server error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
