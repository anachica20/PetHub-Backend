import { Router } from "express";
import { authMiddleware } from '../middleware/auth';
import { getAllPets, getPetById } from "../controllers/pets.controller";

const router = Router();

router.use(authMiddleware);
router.get("/getAllPets", getAllPets);
router.get("/getPetById/:idPet", getPetById);
//router.get("/createNewPet", createPet);



export default router;