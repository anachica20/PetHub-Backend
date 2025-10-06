import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
