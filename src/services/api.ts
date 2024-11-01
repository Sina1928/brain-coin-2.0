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
    "https://braincoins-2-server-e1411787b2ec.herokuapp.com";

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      // Remove withCredentials since we're using token auth
      withCredentials: false,
      // Add timeout
      timeout: 10000,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Ensure headers exists
        config.headers = config.headers || {};

        // Don't add token for login requests
        if (!config.url?.includes("login")) {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        // Handle specific error cases
        if (error.response) {
          // Server responded with error status
          console.error("Server error:", error.response.data);

          if (error.response.status === 401) {
            if (!error.config?.url?.includes("login")) {
              this.clearAuth();
              window.location.href = "/login";
            }
          }

          // Throw error with server message if available
          throw new Error(
            error.response.data?.message ||
              error.response.data?.error ||
              "Server error"
          );
        } else if (error.request) {
          // Request made but no response
          console.error("Network error:", error.message);
          throw new Error("Network error - please check your connection");
        } else {
          // Error setting up request
          console.error("Request setup error:", error.message);
          throw new Error("Failed to make request");
        }
      }
    );
  }

  private clearAuth(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("Attempting login for:", email);

      const response = await this.api.post<LoginResponse>("/users/login", {
        email: email.toLowerCase(),
        password,
      });

      if (response.data.token && response.data.user) {
        this.setAuth(response.data.token, response.data.user);
        return response.data;
      }

      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Login error:", error);
      this.clearAuth();

      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Login failed");
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const response = await this.api.get<User>("/users/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async getTopUsers(): Promise<User[]> {
    try {
      console.log("Fetching top users...");
      const response = await this.api.get<User[]>("/top-ten");
      return response.data;
    } catch (error) {
      console.error("Error fetching top users:", error);
      // Return empty array instead of throwing
      return [];
    }
  }

  logout(): void {
    this.clearAuth();
    window.location.href = "/login";
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!token && !!user;
  }

  // Helper method to get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      this.clearAuth();
      return null;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
