import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./rootReducer";
import authReducer from "./slices/AuthState";
import crudState from "./slices/crudStateSlice";

export const store = configureStore({
  reducer: {
    test: testSlice,
    auth: authReducer,
    crudState: crudState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
