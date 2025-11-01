import { Router } from "express";
import { createAppointment, deleteAppointmentById, getAllappointments, getAppointmentsByPetId } from "../controllers/appointments.controller";
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get("/getAllappointments", getAllappointments);
router.get("/getAppointmentsByPetId/:idPet", getAppointmentsByPetId);
router.delete("/deleteAppointmentById/:idAppointment", deleteAppointmentById);
router.post("/createAppointment", createAppointment);


export default router;
