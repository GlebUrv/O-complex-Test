import { orderReducer } from "@/entities/order/slice/orderSlice";
import { productReducer } from "@/entities/product";
import { reviewReducer } from "@/entities/review";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    products: productReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
