import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  initialState: {
    items: [] as { id: number; [key: string]: any }[],
    loading: false,
    error: null,
    successMessage: null as string | null,
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  clearSuccessMessage,
} = tasksSlice.actions;

export default tasksSlice.reducer;
