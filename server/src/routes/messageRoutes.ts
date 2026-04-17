import express from "express";
import { authMiddleware } from "../middleware/auth";
import db from "../config/db";
import type { NewMessage, Messages } from "../types/messageTypes";
import pool from "../config/db";

const router = express.Router();

// GET all messages
router.get('/', async (req, res) => {
  try {
    const result = await pool.query<Messages>(
      'SELECT message_board.*, users.username FROM message_board JOIN users ON users.id = message_board.user_id ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body as NewMessage;

  const userId = req.user?.userId ?? null;

  if (!userId) {
    return res.status(401).json({ error: "Missing userId from token" });
  }

  const result = await db.query<{ id: number }>(
    `INSERT INTO message_board (user_id, message)
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