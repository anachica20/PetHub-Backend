import {AppointmentRepository} from "../repositories/appointments.repository";

export class AppointmentsService {
    static async getAllappointments() {
        return await AppointmentRepository.find();
    }
};
