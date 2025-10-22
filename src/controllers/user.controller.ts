import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, roleId } = req.body;
    const user = await UserService.createUser({ fullName, email, password, roleId });
    res.status(201).json(user);
  } catch (error: any) {
    console.error("❌ Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};