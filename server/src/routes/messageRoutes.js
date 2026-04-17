"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const db_1 = __importDefault(require("../config/db"));
const db_2 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// GET all messages
router.get('/', async (req, res) => {
    try {
        const result = await db_2.default.query('SELECT message_board.*, users.username FROM message_board JOIN users ON users.id = message_board.user_id ORDER BY created_at DESC');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});
router.post("/", auth_1.authMiddleware, async (req, res) => {
    const { message } = req.body;
    const userId = req.user?.userId ?? null;
    if (!userId) {
        return res.status(401).json({ error: "Missing userId from token" });
    }
    const result = await db_1.default.query(`INSERT INTO message_board (user_id, message)
     VALUES ($1, $2)
     RETURNING id`, [userId, message]);
    res.json({
        id: result.rows[0].id,
        user_id: userId,
        message,
    });
});
exports.default = router;
