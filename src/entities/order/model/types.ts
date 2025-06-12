import type { IProductData } from "@/entities/product";

export interface IProductOrderDate {
  id: number;
  quantity: number;
}

export interface IOrderData {
  phone: string;
  cart: IProductOrderDate[];
}

export interface IOrderResponse {
  success: 1 | 0;
  error?: string | IOrderResponse;
}

export interface ICartItem {
  product: IProductData;
  qty: number;
}

export type IArrayCartItem = ICartItem[];
