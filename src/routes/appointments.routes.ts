import { Router } from "express";
import { createAppointment, deleteAppointmentById, getAllappointments, getAppointmentsByPetId } from "../controllers/appointments.controller";
import { get } from "http";

const router = Router();

router.get("/", getAllappointments);
router.get("/pet/:idPet", getAppointmentsByPetId);
router.delete("/:idAppointment", deleteAppointmentById);
router.post("/", createAppointment);
router.get("/", getAllappointments);

export default router;
