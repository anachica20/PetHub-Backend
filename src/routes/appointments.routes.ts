import { Router } from "express";
import { createAppointment, deleteAppointmentById, getAllappointments, getAppointmentsByPetId } from "../controllers/appointments.controller";
import { get } from "http";

const router = Router();

router.get("/getAllappointments", getAllappointments);
router.get("/getAppointmentsByPetId/:idPet", getAppointmentsByPetId);
router.delete("/deleteAppointmentById/:idAppointment", deleteAppointmentById);
router.post("/createAppointment", createAppointment);

export default router;
