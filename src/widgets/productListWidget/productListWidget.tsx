import { useAppSelector } from "@/shared/hooks";
import styles from "./productListWidget.module.css";
import { SingleProductWidget } from "../singleProductWidget/singleProductWidget";
import type { IProductData } from "@/entities/product";

interface ProductListWidgetProps {
  orders: { product: IProductData; qty: number }[] | [];
  setOrders: React.Dispatch<
    React.SetStateAction<{ product: IProductData; qty: number }[]>
  >;
}

export function ProductListWidget({
  orders,
  setOrders,
}: ProductListWidgetProps): React.JSX.Element {
  const { products } = useAppSelector((store) => store.products);
  console.log("widget products", products);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <SingleProductWidget
          key={product.id}
          product={product}
          orders={orders}
          setOrders={setOrders}
        />
      ))}
    </div>
  );
}
