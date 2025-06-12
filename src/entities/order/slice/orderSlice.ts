import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IArrayCartItem, ICartItem, IOrderResponse } from "../model/types";
import { createOrderThunk } from "../api/orderThunkApi";

type OrderState = {
  order: IOrderResponse | undefined;
  cart: IArrayCartItem;
  error: string | null;
  loading: boolean;
};

const initialState: OrderState = {
  order: undefined,
  cart: [],
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.qty += action.payload.qty;
      } else {
        state.cart.push(action.payload);
      }
      const saveCart: string = JSON.stringify(state.cart);
      localStorage.setItem("cart", saveCart);
    },
    removeItem: (state, action: PayloadAction<ICartItem>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      const saveCart: string = JSON.stringify(state.cart);
      localStorage.setItem("cart", saveCart);
    },
    updateQuantity: (state, action: PayloadAction<ICartItem>) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        item.qty = action.payload.qty;
      }
      const saveCart: string = JSON.stringify(state.cart);
      localStorage.setItem("cart", saveCart);
    },
    clearCart: (state) => {
      state.cart = [];
      try {
        localStorage.removeItem("cart");
        localStorage.removeItem("saved_phone");
      } catch (error) {
        console.error("Ошибка при очистке localStorage:", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
        state.cart = [];
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.order = undefined;
        state.error = action.payload?.error?.toString() || "Произошла ошибка";
      });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  orderSlice.actions;
export const orderReducer = orderSlice.reducer;
