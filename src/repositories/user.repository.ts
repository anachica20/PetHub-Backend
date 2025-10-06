import { db } from "../config/database.js";

export const userRepository = {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM USER");
    return rows;
  },

  async findById(id: number) {
    const [rows] = await db.query("SELECT * FROM USER WHERE id = ?", [id]);
    return rows;
  },
};
