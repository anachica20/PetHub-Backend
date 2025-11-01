import { AppDataSource } from "../config/data-source";
import { PetRepository } from "../repositories/pets.repository";
import { Pet } from "../entities/pet.entity";
import { createPet } from "../controllers/pets.controller";
import { createNewPet } from "../interfaces/pets.interface";

export class PetsService {

    static async getAllPets() {
        const pets = await PetRepository.find({
            relations: ["owner"],
            order: { registrationDate: "DESC" }, //ordenar por fecha
        });

        // Mapeamos para devolver una respuesta más limpia
        return pets.map((pet) => ({
            idPet: pet.idPet,
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            birthDate: pet.birthDate,
            gender: pet.gender,
            registrationDate: pet.registrationDate,
            status: pet.status,
            owner: {
                idUser: pet.owner?.idUser,
                fullName: pet.owner?.fullName,
                email: pet.owner?.email,
                role: pet.owner?.role?.name,
            },
        }));
    }

    static async getPetById(idPet: number) {
        const petRepo = AppDataSource.getRepository(Pet);
        const pet = await petRepo.findOne({
            where: { idPet },
            relations: ["owner"],
        });
        if (!pet) {
            throw new Error("Pet not found");
        }
        return pet;
    }
}

static async createPet(data: createNewPet) {
    const petRepo = AppDataSource.getRepository(Pet);
    const userRepo = AppDataSource.getRepository(User);

    // Buscar el dueño
    const owner = await userRepo.findOne({ where: { idUser: data.ownerId } });
    if (!owner) {
      throw new Error("Owner not found");
    }

    // Crear la mascota
    const newPet = petRepo.create({
      owner,
      name: data.name,
      species: data.species,
      breed: data.breed,
      birthDate: data.birthDate,
    });

    // Guardar en la base de datos
    const savedPet = await petRepo.save(newPet);

    return savedPet;
  }