import { Request, Response, NextFunction } from "express";
import JWT, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

interface AuthUser extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser | null;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.slice(7);

  try {
    req.user = JWT.verify(token, JWT_SECRET!) as unknown as AuthUser;
  } catch (err) {
    req.user = null;

    if (process.env.NODE_ENV !== "production") {
      if (err instanceof TokenExpiredError) {
        console.warn("[auth] Token expired:", err.expiredAt);
      } else if (err instanceof JsonWebTokenError) {
        console.warn("[auth] Invalid token:", err.message);
      }
    }
  }

  next();
}