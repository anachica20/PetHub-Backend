import { Router } from "express";
import { getAllappointments } from "../controllers/appointments.controller";
import { get } from "http";

const router = Router();

router.get("/", getAllappointments);

export default router;
