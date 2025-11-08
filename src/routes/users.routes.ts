import { Router } from "express";
import { createUser, login, getUserById, getAllUsers, deleteUserById, updateUser } from "../controllers/user.controller";


const router = Router();

router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers); // Example route to get all users
router.delete("/deleteUserById/:id", deleteUserById);
router.put("/updateUser/:idUser", updateUser); // Example route to update user details




export default router;