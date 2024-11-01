import axios from "axios";
import { User, TableUser } from "../types";

// Types for authentication
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || "An error occurred";
    throw new Error(errorMessage);
  }
);

// Auth endpoints
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/users/login", {
    email,
    password,
  });
  return response.data;
};

// User endpoints
export const getUserProfile = async (userId: number) => {
  const response = await api.get(`/users/profile/${userId}`);
  return response.data;
};

// Balance endpoints
export const getBalances = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/balance");
  return response.data;
};

export const getTopTen = async (): Promise<TableUser[]> => {
  const response = await api.get<User[]>("/top-ten");
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

export default api;
