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
}
