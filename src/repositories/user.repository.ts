import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/user.entity.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async createUser(data: Partial<User>) {
    const user = this.create(data);
    return this.save(user);
  },

  async findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },

  async findAll() {
    return this.find();
  },

  async findById(idUser: number) {
    return this.findOne({ where: { idUser } });
  },
});
