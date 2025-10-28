import "reflect-metadata";
import dotenv from "dotenv";
import { initializeDataSource } from "./config/data-source.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
  initializeDataSource()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 PetHub Backend running on port ${PORT}`);
      });
    })
    .catch((err) => console.error("❌ Error connecting DB:", err));
}

export default app;

//falta el endpoint para enrutar a la api de rendel