import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/user.entity.js";
import { Role } from "../entities/role.entity.js";
import { UpdateUserDto } from "../interfaces/users.interface.js";
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

    // 2️⃣ Actualizar nombre si se envía
    if (data.fullName) {
      user.fullName = data.fullName.trim();
    }

    // 3️⃣ Actualizar rol si se envía
    if (data.roleId) {
      const newRole = await roleRepo.findOne({ where: { idRole: data.roleId } });
      if (!newRole) throw new Error("Role not found");
      user.role = newRole;
    }

    // 4️⃣ Guardar cambios
    const savedUser = await userRepo.save(user);

    // 5️⃣ Retornar un objeto limpio
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
