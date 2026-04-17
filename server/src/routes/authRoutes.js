"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}
// Register a new user (/auth/register)
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const insertUserResult = await db_1.default.query(`INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING id`, [username, hashedPassword]);
        const userId = insertUserResult.rows[0]?.id;
        if (!userId) {
            throw new Error("Failed to create user");
        }
        const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
        return res.status(201).json({ token });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("[auth/register]", err.message);
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Login a user (/auth/login)
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const userResult = await db_1.default.query(`SELECT * FROM "users" WHERE username = $1`, [username]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
        return res.json({ token });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("[auth/login]", err.message);
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = router;
