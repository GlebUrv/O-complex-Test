import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductResponseType } from "../model/types";
import { THUNK_TYPES } from "@/shared/enums/ThunkTypes";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { API_ROUTES } from "@/shared/enums/ApiRoutes";
import type { AxiosError } from "axios";

export const getProductsThunk = createAsyncThunk<
  ProductResponseType,
  void,
  { rejectValue: "rejected" }
>(THUNK_TYPES.PRODUCTS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ProductResponseType>(
      API_ROUTES.PRODUCTS,
      {
        params: {
          page: 1,
          page_size: 8,
        },
      }
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<"rejected">;
    return rejectWithValue(err.response!.data);
  }
});
