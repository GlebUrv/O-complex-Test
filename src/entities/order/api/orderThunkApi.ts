import { createAsyncThunk } from "@reduxjs/toolkit";
import { THUNK_TYPES } from "@/shared/enums/ThunkTypes";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { API_ROUTES } from "@/shared/enums/ApiRoutes";
import type { AxiosError } from "axios";
import type { IOrderData, IOrderResponse } from "../model/types";

export const createOrderThunk = createAsyncThunk<
  IOrderResponse,
  IOrderData,
  { rejectValue: IOrderResponse }
>(THUNK_TYPES.ORDER, async (orderData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IOrderResponse>(
      API_ROUTES.ORDER,
      orderData
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IOrderResponse>;
    return rejectWithValue({ success: 0, error: err.message });
  }
});
