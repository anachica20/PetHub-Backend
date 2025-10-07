import { Request, Response } from "express";
import { AppointmentsService } from "../services/appointments.service";

export const getAllappointments = async (_req: Request, res: Response) => {
    try {
        let response = await AppointmentsService.getAllappointments();
        res.json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}