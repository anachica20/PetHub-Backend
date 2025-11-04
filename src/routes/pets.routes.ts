import { Router } from "express";
import { authMiddleware } from '../middleware/auth';
import { getAllPets, getPetById, createPet } from "../controllers/pets.controller";

const router = Router();

router.use(authMiddleware);
router.get("/getAllPets", getAllPets);
router.get("/getPetById/:idPet", getPetById);
router.post("/createPet", createPet);



export default router;