import { userRepository } from "../repositories/user.repository";

export const userService = {
  async getAllUsers() {
    return await userRepository.findAll();
  },
};
