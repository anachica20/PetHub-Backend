import "reflect-metadata";
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

export default app;
