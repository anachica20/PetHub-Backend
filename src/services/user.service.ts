import { User } from "../entities/user.entity.js";
import { Role } from "../entities/role.entity.js";
import { UpdateUserDto } from "../interfaces/users.interface.js";
import {UserRepository} from "../repositories/user.repository.js";

import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source.js";
import { AppointmentRepository } from "../repositories/appointments.repository.js";

export class UserService {

  static async createUser({
    fullName,
    email,
    password,
    roleId,
  }: {
    fullName: string;
    email: string;
    password: string;
    roleId: number;
  }) {
    const roleRepo = AppDataSource.getRepository(Role);

    //Verificar si ya existe el usuario
    const existingUser = await UserRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    //Buscar el rol
    const role = await roleRepo.findOne({ where: { idRole: roleId } });
    if (!role) {
      throw new Error("El rol especificado no existe.");
    }

    //Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //Crear el usuario
    const newUser = UserRepository.create({
      fullName,
      email,
      passwordHash,
      role,
    });

    await UserRepository.save(newUser);
    return newUser;
  }

  static async getUserById(id: number) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { idUser: id }, relations: ["role"] });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async getAllUsers() {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find({
      relations: ["role"], 
    });

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  }

  static async deleteUserById(id: number) {

    const user = await UserRepository.findOne({ where: { idUser: id } });
    if (!user) {
      return false;
    }

    const appointmentsAsOwner = await AppointmentRepository.findByOwner(id);
    const appointmentsAsVet = await AppointmentRepository.findByIdVet(id);

    if(appointmentsAsOwner || appointmentsAsVet){
      throw new Error("Cannot delete user with existing appointments");
    }

    await UserRepository.remove(user);
    return true;
  }

  static async updateUser(idUser: number, data: UpdateUserDto) {
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);

    // 1️⃣ Buscar el usuario
    const user = await userRepo.findOne({
      where: { idUser },
      relations: ["role"],
    });

    if (!user) {
      throw new Error("User not found");
    }


    if (data.fullName) {
      user.fullName = data.fullName.trim();
    }

    if (data.roleId) {
      const newRole = await roleRepo.findOne({ where: { idRole: data.roleId } });
      if (!newRole) throw new Error("Role not found");
      user.role = newRole;
    }


    const savedUser = await userRepo.save(user);

    return {
      idUser: savedUser.idUser,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role.idRole,
      status: savedUser.status,
      updatedAt: savedUser.updatedAt,
    };
  }

}
