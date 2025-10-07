import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { User } from "./user.entity";

@Entity({ name: "APPOINTMENT" })
export class Appointment {
  @PrimaryGeneratedColumn({ name: "ID_APPOINTMENT" })
  idAppointment!: number;

  @ManyToOne(() => Pet, (pet) => pet.appointments, { onDelete: "CASCADE" })
  pet!: Pet;

  @ManyToOne(() => User, (user) => user.appointmentsAsVet, {
    onDelete: "RESTRICT",
  })
  veterinarian!: User;

  @ManyToOne(() => User, (user) => user.appointmentsAsOwner, {
    onDelete: "CASCADE",
  })
  owner!: User;

  @Column({ name: "APPOINTMENT_DATE", type: "datetime" })
  appointmentDate!: Date;

  @Column({
    name: "STATUS",
    type: "enum",
    enum: ["PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED"],
    default: "PENDING",
  })
  status!: "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" | "COMPLETED";

  @Column({ name: "NOTES", type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn({ name: "CREATION_DATE" })
  creationDate!: Date;

  @UpdateDateColumn({ name: "UPDATED_AT" })
  updatedAt!: Date;
}
