import apiService from "./api";

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
    const response = await apiService.login(email, password);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
