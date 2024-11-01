import axios, { AxiosInstance } from "axios";

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

  constructor() {
    // Update this line to use the Heroku URL when deployed
    this.api = axios.create({
      baseURL:
        import.meta.env.VITE_API_URL ||
        "https://your-heroku-app-name.herokuapp.com/api", // Replace with your Heroku app URL
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for auth token
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
  }

  // Auth methods
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>("/users/login", {
      email,
      password,
    });
    return response.data;
  }

  // User profile methods
  async getUserProfile(): Promise<User> {
    const response = await this.api.get<User>("/users/profile");
    return response.data;
  }

  // Top users methods
  async getTopUsers(): Promise<User[]> {
    const response = await this.api.get<User[]>("/top-ten"); // Adjusted to match your route
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
