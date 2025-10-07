import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Appointment } from "./appointment.entity";

@Entity({ name: "PET" })
export class Pet {
  @PrimaryGeneratedColumn({ name: "ID_PET" })
  idPet!: number;

  // Relación con el dueño (User)
  @ManyToOne(() => User, (user) => user.pets, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true, // opcional: carga automática del dueño
    nullable: false,
  })
  @JoinColumn({ name: "ID_OWNER" }) // crea correctamente la FK
  owner!: User;

  @Column({ name: "NAME", type: "varchar", length: 100 })
  name!: string;

  @Column({ name: "SPECIES", type: "varchar", length: 50 })
  species!: string;

  @Column({ name: "BREED", type: "varchar", length: 100, nullable: true })
  breed?: string;

  @Column({ name: "BIRTH_DATE", type: "date", nullable: true })
  birthDate?: Date;

  @Column({
    name: "GENDER",
    type: "enum",
    enum: ["MALE", "FEMALE", "UNKNOWN"],
    default: "UNKNOWN",
  })
  gender!: "MALE" | "FEMALE" | "UNKNOWN";

  @CreateDateColumn({name: "REGISTRATION_DATE",type: "timestamp"})
  registrationDate!: Date;

  @Column({
    name: "STATUS",
    type: "enum",
    enum: ["ACTIVE", "DECEASED", "TRANSFERRED"],
    default: "ACTIVE",
  })
  status!: "ACTIVE" | "DECEASED" | "TRANSFERRED";

  // Relación con citas
  @OneToMany(() => Appointment, (appt) => appt.pet)
  appointments!: Appointment[];
}
