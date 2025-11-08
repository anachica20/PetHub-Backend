import { Router } from "express";
import { createAppointment, deleteAppointmentById, getAllappointments, getAppointmentsByPetId, updateAppointment } from "../controllers/appointments.controller";
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get("/getAllappointments", getAllappointments);
router.get("/getAppointmentsByPetId/:idPet", getAppointmentsByPetId);
router.post("/createAppointment", createAppointment);
router.put("/updateAppointment", updateAppointment);
router.delete("/deleteAppointmentById/:idAppointment", deleteAppointmentById);


export default router;