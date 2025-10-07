import { Router } from "express";
import appointmentRoutes from "./appointments.routes";

const router = Router();

router.use("/appointments", appointmentRoutes);

export default router;
