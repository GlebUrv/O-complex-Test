import { createSlice } from "@reduxjs/toolkit";
import type { ArrayReviewsType } from "../model/types";
import { getReviewsThunk } from "../api/reviewThunkApi";

type ReviewsState = {
  reviews: ArrayReviewsType | [];
  error: string | null;
  loading: boolean;
};

const initialState: ReviewsState = {
  reviews: [],
  error: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(getReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.reviews = [];
        state.error = action.payload || "Произошла ошибка";
      });
  },
});

export const reviewReducer = reviewSlice.reducer;
