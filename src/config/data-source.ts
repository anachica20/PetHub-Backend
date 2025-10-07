import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Appointment } from "../entities/appointment.entity";
import { Pet } from "../entities/pet.entity";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "",
  port: 3306,
  username: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "",
  entities: [Appointment, Pet, Role, User],
  synchronize: true,
  logging: false,
});

export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("✅ Database connected");
  }
};
