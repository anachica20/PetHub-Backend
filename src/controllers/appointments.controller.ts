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

export const getAppointmentsByPetId = async (_req: Request, res: Response) => {   
    try {
        const { idPet } = _req.params;
        const petId = Number(idPet);

        if (isNaN(petId)) {
            return res.status(400).json({ message: "El ID de la mascota no es válido" });
        }

        let response = await AppointmentsService.getAppointmentsByPetId(petId);
        res.json(response);
    } catch (error: any) {
        console.error("Error fetching appointments by pet:", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteAppointmentById = async (req: Request, res: Response) => {
    try {
        const { idAppointment } = req.params;
        const appointmentId = Number(idAppointment);

        if (isNaN(appointmentId)) {
            return res.status(400).json({ message: "El ID de la cita no es válido" });
        }

        const response = await AppointmentsService.deleteAppointmentById(appointmentId);
        res.json(response);
    } catch (error: any) {
        console.error("Error eliminando cita:", error);
        res.status(500).json({ message: "Error al eliminar la cita" });
    }    
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { petId, ownerId, veterinarianId, appointmentDate, notes } = req.body;

    if (!petId || !ownerId || !veterinarianId || !appointmentDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await AppointmentsService.createAppointment({
      petId,
      ownerId,
      veterinarianId,
      appointmentDate: new Date(appointmentDate),
      notes,
    });

    res.status(201).json(appointment);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};