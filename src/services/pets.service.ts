import { PetRepository } from "../repositories/pets.repository";
import { Pet } from "../entities/pet.entity";
import { createNewPet, UpdatePetDto } from "../interfaces/pets.interface";
import { UserRepository } from "../repositories/user.repository";
import { AppointmentRepository } from "../repositories/appointments.repository";

export class PetsService {

    static async getAllPets() {
        const pets = await PetRepository.find({
            relations: ["owner"],
            order: { registrationDate: "DESC" },
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
        const pet = await PetRepository.findOne({
            where: { idPet },
            relations: ["owner"],
        });
        if (!pet) {
            throw new Error("Pet not found");
        }
        return pet;
    }

    static async createPet(data: createNewPet) {
        // Buscar el dueño
        const owner = await UserRepository.findById(data.ownerId);
        if (!owner) {
            throw new Error("Owner not found");
        }

        const pet: Pet = new Pet();

        pet.name = data.name;
        pet.species = data.species;
        pet.breed = data.breed;
        pet.birthDate = data.birthDate ?? new Date();
        pet.owner = owner;

        // Crear la mascota
        const newPet = await PetRepository.save(pet);

        return newPet;
    }
    
    static async deletePetById(idPet: number): Promise<void> {

        const pet = await PetRepository.findOne({ where: { idPet } });
        if (!pet) {
            throw new Error("Pet not found");
        }
        const dates = await AppointmentRepository.findByPet(idPet);

        if(dates.length > 0){
            throw new Error("Cannot delete pet with existing appointments");
        }

        await PetRepository.remove(pet); // elimina completamente el registro
    }


static async updatePetById(id: number, data: UpdatePetDto) {

    // 🔍 Buscar la mascota existente
    const pet = await PetRepository.findOne({ where: { idPet: id } });
    if (!pet) {
      throw new Error("Pet not found");
    }

    // 📝 Actualizar solo los campos permitidos
    if (data.name) pet.name = data.name;
    if (data.gender) pet.gender = data.gender;
    if (data.status) pet.status = data.status;

    // 💾 Guardar cambios
    const updatedPet = await PetRepository.save(pet);

    return updatedPet;
  }

}
