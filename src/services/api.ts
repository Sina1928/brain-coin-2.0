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
    this.api = axios.create({
      baseURL: "https://braincoins-2-server-e1411787b2ec.herokuapp.com",
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
    try {
      const response = await this.api.get<User[]>("/top-ten");
      console.log("Fetched users: ", response.data);

      // Check if response.data is an array before returning
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Expected an array but received:", response.data);
        return []; // Return an empty array if the data format is not as expected
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
      return []; // Return an empty array on error
    }
  }
}
export const apiService = new ApiService();
export default apiService;
