import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appointment.entity";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

  async findByOwner(idOwner: number) {
    return this.createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.pet", "pet")
      .leftJoinAndSelect("appointment.veterinarian", "veterinarian")
      .where("appointment.owner = :idOwner", { idOwner })
      .getMany();
  },

  async findByPet(idPet: number) {
    return this.createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.pet", "pet")
      .leftJoinAndSelect("appointment.veterinarian", "veterinarian")
      .leftJoinAndSelect("appointment.owner", "owner")
      .where("pet.idPet = :idPet", { idPet })
      .getMany();
  },

  async deleteById(idAppointment: number) {
    return this.delete({ idAppointment });
  },

  //crear repository para todas las citas 


});
