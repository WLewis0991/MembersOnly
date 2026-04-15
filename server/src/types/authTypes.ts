
interface Users {
  id: number;
  username: string;
  password: string;
}

interface RegisterBody {
  username: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export type { Users, RegisterBody , LoginBody}