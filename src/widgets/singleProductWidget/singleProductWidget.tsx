import type { IProductData } from "@/entities/product";
import styles from "./singleProductWidget.module.css";
import { useState } from "react";
import { CounterWidget } from "../index";

interface Props {
  product: IProductData;
  orders: { product: IProductData; qty: number }[] | [];
  setOrders: React.Dispatch<
    React.SetStateAction<{ product: IProductData; qty: number }[]>
  >;
}

export function SingleProductWidget({
  product,
  orders,
  setOrders,
}: Props): React.JSX.Element {
  const [productCounter, setProductCounter] = useState(0);

  return (
    <div className={styles.productCard}>
      <div>
        <img
          className={styles.productImg}
          src={product.image_url}
          alt="изображение товара"
        />
        <h2>{product.title}</h2>
        <div>{product.description}</div>
        <h2>Цена: {product.price}₽</h2>
      </div>
      {productCounter === 0 ? (
        <button
          className={styles.buyBtn}
          onClick={() => {
            const newQty = productCounter + 1;
            setProductCounter(newQty);
            setOrders((prev) => [...prev, { product, qty: newQty }]);
          }}
        >
          Купить
        </button>
      ) : (
        <CounterWidget
          product={product}
          orders={orders}
          counterValue={productCounter}
          setCounterValue={setProductCounter}
          setOrders={setOrders}
        />
      )}
    </div>
  );
}
