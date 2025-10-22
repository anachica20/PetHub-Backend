import { AppointmentRepository } from "../repositories/appointments.repository";
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appointment.entity";
import { Pet } from "../entities/pet.entity";
import { User } from "../entities/user.entity";
import { CreateAppointmentDto, AppointmentResponse } from "../interfaces/appointment.interface";

export class AppointmentsService {

  static async getAllappointments(): Promise<AppointmentResponse[]> {
    const appointments = await AppointmentRepository.find();

    // Mapeamos los resultados para no devolver objetos enteros
    return appointments.map(a => ({
      idAppointment: a.idAppointment,
      petId: a.pet.idPet,
      ownerId: a.owner.idUser,
      veterinarianId: a.veterinarian.idUser,
      appointmentDate: a.appointmentDate,
      status: a.status,
      notes: a.notes,
      creationDate: a.creationDate,
    } as AppointmentResponse));
  }

  static async getAppointmentsByPetId(petId: number): Promise<AppointmentResponse[]> {
    const appointments = await AppointmentRepository.findByPet(petId);

    return appointments.map(a => ({
      idAppointment: a.idAppointment,
      petId: a.pet.idPet,
      ownerId: a.owner.idUser,
      veterinarianId: a.veterinarian.idUser,
      appointmentDate: a.appointmentDate,
      status: a.status,
      notes: a.notes,
      creationDate: a.creationDate,
    } as AppointmentResponse));
  }

  static async deleteAppointmentById(idAppointment: number) {
    const result = await AppointmentRepository.deleteById(idAppointment);
    return result.affected && result.affected > 0
      ? { message: "Cita eliminada correctamente" }
      : { message: "Cita no encontrada" };
  }

  static async createAppointment(data: CreateAppointmentDto): Promise<AppointmentResponse> {
    const petRepo = AppDataSource.getRepository(Pet);
    const userRepo = AppDataSource.getRepository(User);
    const appointmentRepo = AppDataSource.getRepository(Appointment);

    const pet = await petRepo.findOneBy({ idPet: data.petId });
    if (!pet) throw new Error("La mascota no existe");

    const owner = await userRepo.findOneBy({ idUser: data.ownerId });
    if (!owner) throw new Error("El dueño no existe");

    const vet = await userRepo.findOneBy({ idUser: data.veterinarianId });
    if (!vet) throw new Error("El veterinario no existe");

    if (!data.appointmentDate) throw new Error("La fecha de la cita es obligatoria");

    const appointment = appointmentRepo.create({
      pet,
      owner,
      veterinarian: vet,
      appointmentDate: data.appointmentDate,
      status: "PENDING",
      notes: data.notes,
    });

    const saved = await appointmentRepo.save(appointment);

    return {
      idAppointment: saved.idAppointment,
      petId: pet.idPet,
      ownerId: owner.idUser,
      veterinarianId: vet.idUser,
      appointmentDate: saved.appointmentDate,
      status: saved.status,
      notes: saved.notes,
      creationDate: saved.creationDate,
    } as AppointmentResponse;

  }
}
