import axios from "axios";

const API_BASE_URL = "https://dummyjson.com/auth";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const loginApi = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error("Failed to login. Please check your credentials.");
  }
};
