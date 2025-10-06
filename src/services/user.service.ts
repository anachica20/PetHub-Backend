import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async getAllUsers() {
    return await userRepository.findAll();
  },
};
