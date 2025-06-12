import { useAppSelector } from "@/shared/hooks";
import styles from "./productListWidget.module.css";
import { SingleProductWidget } from "../singleProductWidget/singleProductWidget";

export function ProductListWidget(): React.JSX.Element {
  const { products } = useAppSelector((store) => store.products);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <SingleProductWidget
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
