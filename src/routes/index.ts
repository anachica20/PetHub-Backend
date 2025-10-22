import { Router } from "express";
import appointmentRoutes from "./appointments.routes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/appointments", appointmentRoutes);
router.use("/api/users", userRoutes);

export default router;
