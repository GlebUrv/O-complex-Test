import { createSlice } from "@reduxjs/toolkit";
import type { IOrderResponse } from "../model/types";
import { createOrderThunk } from "../api/orderThunkApi";

type OrderState = {
  order: IOrderResponse | undefined;
  error: string | null;
  loading: boolean;
};

const initialState: OrderState = {
  order: undefined,
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.order = undefined;
        state.error = action.payload || "Произошла ошибка";
      });
  },
});

export const orderReducer = orderSlice.reducer;
