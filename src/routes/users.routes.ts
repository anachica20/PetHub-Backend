import { Router } from "express";
import { createUser, login, getUserById, getAllUsers, deleteUserById, updateUser } from "../controllers/user.controller";


const router = Router();

router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers); 
router.delete("/deleteUserById/:id", deleteUserById);
router.put("/updateUser/:idUser", updateUser);




export default router;