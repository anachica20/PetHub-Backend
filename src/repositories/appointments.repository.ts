import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appointment.entity";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

async findByOwner(idOwner: number) {
  return this.createQueryBuilder("appointment")
    .leftJoinAndSelect("appointment.pet", "pet")
    .leftJoinAndSelect("appointment.veterinarian", "veterinarian")
    .leftJoinAndSelect("appointment.owner", "owner")
    .where("owner.idUser = :idOwner", { idOwner })
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

async findByIdVet(idVet: number) {
  return this.createQueryBuilder("appointment")
    .leftJoinAndSelect("appointment.veterinarian", "veterinarian")
    .leftJoinAndSelect("appointment.pet", "pet")
    .leftJoinAndSelect("appointment.owner", "owner")
    .where("veterinarian.idUser = :idVet", { idVet })
    .getMany();
}
,


  async deleteById(idAppointment: number) {
    return this.delete({ idAppointment });
  },

  //crear repository para todas las citas 


});
