import axios from "axios";
import { User, TableUser } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBalances = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/balance");
  return response.data;
};

export const getTopTen = async (): Promise<TableUser[]> => {
  const response = await api.get<User[]>("/top-ten");
  // Transform User[] to TableUser[]
  return response.data.map((user) => ({
    id: user.id,
    username: user.username,
    "Umer coins": user.balances["Umer coins"],
    "Mark bucks": user.balances["Mark bucks"],
    Kcoins: user.balances["Kcoins"],
    CorgiCoins: user.balances["CorgiCoins"],
    "Neo Coins": user.balances["Neo Coins"],
    totalValueInMarkBucks: user.totalValueInMarkBucks,
  }));
};

export const getUserProfile = async (userId: number) => {
  const response = await api.get(`/users/profile/${userId}`);
  return response.data;
};

export default api;
