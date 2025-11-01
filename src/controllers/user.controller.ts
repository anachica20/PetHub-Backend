import { Request, Response } from "express";
import { UserService } from "../services/user.service";
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Usuario hardcodeado (sin base de datos)
const HARDCODED_USER = {
  username: 'admin',
  password: '$2a$10$XQB5qVvJJJZJ3Q3J3Q3J3uZQ3J3Q3J3Q3J3Q3J3Q3J3Q3J3Q3J3Q3' // password: admin123
};

// Ruta de login
export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login request body:', req.body);
    const { username, password } = req.body;

    // Validar que se envíen los datos
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporcione usuario y contraseña'
      });
    }

    // Validar credenciales
    if (username !== HARDCODED_USER.username) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Para simplificar, también aceptamos la contraseña en texto plano "admin123"
    const isPasswordValid = password === 'admin123' ||
      await bcrypt.compare(password, HARDCODED_USER.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT con expiración de 1 hora
    const token = jwt.sign(
      {
        username: HARDCODED_USER.username,
        loginTime: new Date().toISOString()
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      expiresIn: '1h',
      user: {
        username: HARDCODED_USER.username
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const id = parseInt(idParam, 10);
    const user = await UserService.getUserById(id);

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("❌ Error fetching user:", error);
    return res.status(400).json({ message: error.message });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    console.error("❌ Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userId = parseInt(id); // ← Usamos params, no query

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deleted = await UserService.deleteUserById(userId);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};