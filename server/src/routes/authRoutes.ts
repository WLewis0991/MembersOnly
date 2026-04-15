import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db"
import { Users, RegisterBody, LoginBody } from "../types/authTypes";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}
// Register a new user (/auth/register)
router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const insertUserResult = await db.query(
      `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING id`,
      [username, hashedPassword]
    );

    const userId = insertUserResult.rows[0]?.id;
    if (!userId) {
      throw new Error("Failed to create user");
    }

    const token = jwt.sign(
      { userId },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.error("[auth/register]", err.message);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login a user (/auth/login)
router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  try {
    const userResult = await db.query(
      `SELECT * FROM "users" WHERE username = $1`,
      [username]
    );
    const user = userResult.rows[0] as Users | undefined;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.error("[auth/login]", err.message);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;