import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/user.entity.js";
import { Role } from "../entities/role.entity.js";
import bcrypt from "bcrypt";

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
    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);

    // 🧩 Verificar si ya existe el usuario
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    // 🧩 Buscar el rol
    const role = await roleRepo.findOne({ where: { idRole: roleId } });
    if (!role) {
      throw new Error("El rol especificado no existe.");
    }

    // 🔐 Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 🧱 Crear el usuario
    const newUser = userRepo.create({
      fullName,
      email,
      passwordHash,
      role, // ← Aquí pasas la entidad Role completa
    });

    await userRepo.save(newUser);
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
      relations: ["role"], // incluir la relación con Role si aplica
    });

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  }

  static async deleteUserById(id: number) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { idUser: id } });
    if (!user) {
      return false; // No existe
    }

    await userRepo.remove(user); // o delete({ idUser: id }) si prefieres
    return true;
  }
}
