import express from "express";
import { authMiddleware } from "../middleware/auth";
import db from "../config/db";
import type { NewMessage } from "../types/messageTypes";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body as NewMessage;
  const userId = (req as any).userId as number;

  const result = await db.query<{ id: number }>(
    `INSERT INTO messages (user_id, message)
     VALUES ($1, $2)
     RETURNING id`,
    [userId, message]
  );

  res.json({
    id: result.rows[0].id,
    user_id: userId,
    message,
  });
});

export default router;