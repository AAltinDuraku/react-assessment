import axios from "axios";
import { store } from "./../redux/store";
import { logout } from "../redux/slices/AuthState";
import { validateToken } from "../utils/authUtils";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    validateToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}` as string;
    } else {
      store.dispatch(logout());
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response: any) => {
//     return response;
//   },
//   (error: { response: any; message: any }) => {
//     console.error("API Error:", error.response || error.message);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
