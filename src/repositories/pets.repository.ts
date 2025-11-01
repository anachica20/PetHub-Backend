import { AppDataSource } from "../config/data-source";
import { Pet } from "../entities/pet.entity";

export const PetRepository = AppDataSource.getRepository(Pet);
