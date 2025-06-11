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
