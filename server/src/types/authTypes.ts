import type { JwtPayload } from "jsonwebtoken";

interface User {
  id: number;
  username: string;
  password: string;
}

// LoginBody is identical to RegisterBody so just aliased at the bottom
interface RegisterBody {
  username: string;
  password: string;
}

interface AuthUser extends JwtPayload {
  id: string;
  email: string;
}

export type { User, RegisterBody, AuthUser };
export type LoginBody = RegisterBody;