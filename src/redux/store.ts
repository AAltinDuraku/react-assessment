import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./rootReducer";
import authReducer from "./slices/AuthState";

export const store = configureStore({
  reducer: {
    test: testSlice,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
