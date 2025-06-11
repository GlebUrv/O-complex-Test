export interface IProductData {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export type ArrayProductsType = IProductData[];

export type ProductResponseType = {
  page: number;
  amount: number;
  total: number;
  items: ArrayProductsType;
};
