import api from "./api";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
