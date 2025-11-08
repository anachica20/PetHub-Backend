import { Router } from "express";
import { authMiddleware } from '../middleware/auth';
import { getAllPets, getPetById, createPet, deletePetById, updatePetById } from "../controllers/pets.controller";

const router = Router();

router.use(authMiddleware);
router.get("/te", getAllPets);
router.get("/getPetById/:idPet", getPetById);
router.post("/createPet", createPet);
router.delete("/deletePetById/:idPet", deletePetById);
router.put("/updatePetById/:idPet", updatePetById);


export default router;