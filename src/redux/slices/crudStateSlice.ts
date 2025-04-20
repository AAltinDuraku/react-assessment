import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CrudState {
  loading: boolean;
  message: string | null;
  messageType: "success" | "error" | null; //adding info would be nice here
}

const initialState: CrudState = {
  loading: false,
  message: null,
  messageType: null,
};

const crudStateSlice = createSlice({
  name: "crudState",
  initialState,
  reducers: {
    onLoad(state) {
      state.loading = true;
    },
    onSuccess(
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | null;
      }>
    ) {
      state.loading = false;
      state.message = action.payload.message;
      state.messageType = action.payload.type;
    },
    onError(
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | null;
      }>
    ) {
      state.loading = false;
      state.message = action.payload.message;
      state.messageType = action.payload.type;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
    },
  },
});

export const { onLoad, onSuccess, onError, clearMessage } =
  crudStateSlice.actions;
export default crudStateSlice.reducer;
