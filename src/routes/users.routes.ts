import { Router } from "express";
import { createUser, login, getUserById, getAllUsers, deleteUserById } from "../controllers/user.controller";


const router = Router();

router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers); // Example route to get all users
router.delete("/deleteUserById/:id", deleteUserById);




export default router;