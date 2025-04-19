import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { time } from "console";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  timeLoggedIn: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  timeLoggedIn: localStorage.getItem("tokenTimestamp") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; user: User; timeLoggedIn: string }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.timeLoggedIn = null;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.timeLoggedIn = null;
      state.user = null;
      state.timeLoggedIn = null;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.timeLoggedIn = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
