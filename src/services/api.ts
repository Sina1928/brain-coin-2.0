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
      withCredentials: true,
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
      async (error: AxiosError<ErrorResponse>) => {
        // Don't redirect to login page if this is a login request
        const isLoginRequest = error.config?.url?.includes("/login");

        if (error.response?.status === 401 && !isLoginRequest) {
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

  private setAuth(token: string, user: User): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>("/users/login", {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        this.setAuth(response.data.token, response.data.user);
        return response.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "Login failed";
      this.clearAuth(); // Clear any existing auth data
      throw new Error(errorMessage);
    }
  }

  // User profile methods
  async getUserProfile(): Promise<User> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

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
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching top users:", error);
      return [];
    }
  }

  // Logout method
  logout(): void {
    this.clearAuth();
    window.location.href = "/login";
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}

export const apiService = new ApiService();
export default apiService;
