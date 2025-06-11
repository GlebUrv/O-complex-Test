import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ArrayReviewsType } from "../model/types";
import { THUNK_TYPES } from "@/shared/enums/ThunkTypes";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { API_ROUTES } from "@/shared/enums/ApiRoutes";
import type { AxiosError } from "axios";

export const getReviewsThunk = createAsyncThunk<
  ArrayReviewsType,
  void,
  { rejectValue: "rejected" }
>(THUNK_TYPES.REVIEWS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ArrayReviewsType>(
      API_ROUTES.REVIEWS,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<"rejected">;
    return rejectWithValue(err.response!.data);
  }
});
