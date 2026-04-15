export type NewMessage = {
  user_id: number;
  message: string;
};

export type JwtPayload = {
  userId: number;
};