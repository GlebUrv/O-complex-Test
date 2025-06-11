import { createSlice } from "@reduxjs/toolkit";
import type { ArrayProductsType } from "../model/types";
import { getProductsThunk } from "../api/productThunkApi";

type ReviewsState = {
  products: ArrayProductsType | [];
  error: string | null;
  loading: boolean;
};

const initialState: ReviewsState = {
  products: [],
  error: null,
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.items;
        state.error = null;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload || "Произошла ошибка";
      });
  },
});

export const productReducer = productSlice.reducer;
