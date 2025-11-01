import { Router } from "express";
import appointmentRoutes from "./appointments.routes";
import userRoutes from "./users.routes";
import petRoutes from "./pets.routes";


const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/users", userRoutes);
router.use("/pets", petRoutes );



export default router;
