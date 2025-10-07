import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "ROLE" })
export class Role {
  @PrimaryGeneratedColumn({ name: "ID_ROLE" })
  idRole!: number;

  @Column({ name: "NAME", type: "varchar", length: 50, unique: true })
  name!: string;

  @Column({ name: "DESCRIPTION", type: "varchar", length: 255, nullable: true })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
