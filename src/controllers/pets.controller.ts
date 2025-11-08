import { Request, Response } from "express";
import { PetsService } from "../services/pets.service";
import { createNewPet, UpdatePetDto } from "../interfaces/pets.interface";
import { ExplainVerbosity } from "typeorm";

export const getAllPets = async (_req: Request, res: Response) => {
  try {
    const pets = await PetsService.getAllPets();
    return res.status(200).json(pets);
  } catch (error: any) {
    console.error("Error fetching users:", error);
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
    console.error("Error fetching pet:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPet = async (req: Request, res: Response) => {
  try {
    const petData = req.body as createNewPet;
    if (!petData.ownerId || !petData.name || !petData.species) {
      return res.status(400).json({
        message: "Missing required fields: ownerId, name, and species are mandatory",
      });
    }

    const newPet = await PetsService.createPet(petData);
    return res.status(201).json(newPet);
  } catch (error: unknown) {
    console.error("Error creating pet:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error creating pet";
    return res.status(500).json({ message });
  }
};

export const deletePetById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.idPet;

    if (!idParam) {
      return res.status(400).json({ message: "Missing pet ID" });
    }

    const idPet = parseInt(idParam, 10);
    if (isNaN(idPet)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    await PetsService.deletePetById(idPet);
    return res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting pet:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    const status = message === "Pet not found" ? 404 : 500;
    return res.status(status).json({ message });
  }
};

export const updatePetById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.idPet; // viene de la URL /pets/:idPet

    if (!idParam) {
      return res.status(400).json({ message: "Missing pet ID" });
    }

    const petId = Number(idParam);
    if (isNaN(petId)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    const updateData: UpdatePetDto = req.body;

    const updatedPet = await PetsService.updatePetById(petId, updateData);

    return res.status(200).json({
      message: "Pet updated successfully",
      pet: updatedPet,
    });
  } catch (error: any) {
    console.error("Error updating pet:", error);
    return res.status(500).json({ message: error.message });
  }
};