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

interface ErrorResponse {
  error: string;
  message?: string;
}

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL =
    import.meta.env.VITE_API_URL ||
    "https://braincoins-2-server-e1411787b2ec.herokuapp.com";

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Important for CORS
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
      (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>("/users/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
  }

  // User profile methods
  async getUserProfile(): Promise<User> {
    try {
      const response = await this.api.get<User>("/users/profile");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to fetch user profile";
      throw new Error(errorMessage);
    }
  }

  // Top users methods
  async getTopUsers(): Promise<User[]> {
    try {
      const response = await this.api.get<User[]>("/top-ten");

      if (Array.isArray(response.data)) {
        return response.data;
      }

      console.warn("Expected an array but received:", response.data);
      return [];
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error fetching top users:", axiosError.message);
      throw error;
    }
  }

  // Logout method
  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
}

export const apiService = new ApiService();
export default apiService;
