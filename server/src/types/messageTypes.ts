export type NewMessage = {
  user_id: number;
  message: string;
};

export type JwtPayload = {
  userId: number;
};

export type Messages= {
  id: number;
  user_id: string;
  message: string;
  create_at: string;
  likes: number;
}