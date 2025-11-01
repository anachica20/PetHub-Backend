import { Request, Response } from "express";
import { PetsService } from "../services/pets.service";

export const getAllPets = async (_req: Request, res: Response) => {
    try {
        const pets = await PetsService.getAllPets();
        return res.status(200).json(pets);
    } catch (error: any) {
        console.error("❌ Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.idPet;

    if (!idParam) {
      return res.status(400).json({ message: "Missing pet ID" });
    }

    const petId = parseInt(idParam, 10);
    const pet = await PetsService.getPetById(petId);

    return res.status(200).json(pet);
  } catch (error: any) {
    console.error("❌ Error fetching pet:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const createPet = async (req: Request, res: Response) => {
//   try {
//     const petData: CreatePet = req.body;

//     // Validaciones mínimas
//     if (!petData.ownerId || !petData.name || !petData.species) {
//       return res.status(400).json({
//         message: "Missing required fields: ownerId, name, and species are mandatory",
//       });
//     }

//     const newPet = await PetsService.createPet(petData);
//     return res.status(201).json(newPet);
//   } catch (error: any) {
//     console.error("❌ Error creating pet:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };
