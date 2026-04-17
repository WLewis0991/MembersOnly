import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export async function login(username: string, password: string) {
  const res = await api.post("auth/login", { username, password });
  return res.data;
}

export async function register(username: string, password: string) {
  const res = await api.post("auth/register", { username, password });
  return res.data;
}