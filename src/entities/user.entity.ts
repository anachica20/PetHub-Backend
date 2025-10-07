import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { Pet } from "./pet.entity";
import { Appointment } from "./appointment.entity";

@Entity({ name: "USER" })
export class User {
    @PrimaryGeneratedColumn({ name: "ID_USER" })
    idUser!: number;

    // Relación con Role
    @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: false })
    @JoinColumn({ name: "ID_ROLE" }) // asegura que la FK se cree correctamente
    role!: Role;

    @Column({ name: "FULL_NAME", type: "varchar", length: 150 })
    fullName!: string;

    @Column({ name: "EMAIL", type: "varchar", length: 100, unique: true })
    email!: string;

    @Column({ name: "PASSWORD_HASH", type: "varchar", length: 255 })
    passwordHash!: string;

    @Column({
    name: "STATUS",
    type: "enum",
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
    })
    status!: "ACTIVE" | "INACTIVE";

    @CreateDateColumn({ name: "CREATION_DATE", type: "timestamp" })
    creationDate!: Date;

    @UpdateDateColumn({ name: "UPDATED_AT", type: "timestamp" })
    updatedAt!: Date;

    // Relaciones
    @OneToMany(() => Pet, (pet) => pet.owner)
    pets!: Pet[];

    @OneToMany(() => Appointment, (appt) => appt.owner)
    appointmentsAsOwner!: Appointment[];

    @OneToMany(() => Appointment, (appt) => appt.veterinarian)
    appointmentsAsVet!: Appointment[];
}
