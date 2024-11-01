import axios, { AxiosInstance, AxiosError } from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  balances: {
    "Umer coins": number;
    "Mark bucks": number;
    Kcoins: number;
    CorgiCoins: number;
    "Neo Coins": number;
  };
  totalValueInMarkBucks: number;
}

interface LoginResponse {
  token: string;
  user: User;
}

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL =
    "https://braincoins-2-server-e1411787b2ec.herokuapp.com/api"; // Note the /api prefix

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        if (!config.url?.includes("login")) {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (
          error.response?.status === 401 &&
          !error.config?.url?.includes("login")
        ) {
          this.clearAuth();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  private clearAuth(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>("/users/login", {
        email: email.toLowerCase(), // Ensure email is lowercase
        password,
      });

      if (response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const errorMessage = axiosError.response?.data?.error || "Login failed";
      this.clearAuth();
      throw new Error(errorMessage);
    }
  }

  async getUserProfile(): Promise<User> {
    const response = await this.api.get<User>("/users/profile");
    return response.data;
  }

  async getTopUsers(): Promise<User[]> {
    const response = await this.api.get<User[]>("/top-ten");
    return response.data;
  }

  logout(): void {
    this.clearAuth();
    window.location.href = "/login";
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}

export const apiService = new ApiService();
export default apiService;
