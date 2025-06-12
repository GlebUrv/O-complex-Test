import type { IProductData } from "@/entities/product";
import styles from "./singleProductWidget.module.css";
import { useState } from "react";
import { CounterWidget } from "../index";
import { useAppDispatch } from "@/shared/hooks";
import { addItem } from "@/entities/order/slice/orderSlice";

interface Props {
  product: IProductData;
}

export function SingleProductWidget({ product }: Props): React.JSX.Element {
  const [productCounter, setProductCounter] = useState(0);
  const dispatch = useAppDispatch();

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
        <h2>Цена: {product.price} ₽</h2>
      </div>
      {productCounter === 0 ? (
        <button
          className={styles.buyBtn}
          onClick={() => {
            const newQty = productCounter + 1;
            setProductCounter(newQty);
            dispatch(addItem({ product, qty: newQty }));
          }}
        >
          Купить
        </button>
      ) : (
        <CounterWidget
          product={product}
          counterValue={productCounter}
          setCounterValue={setProductCounter}
        />
      )}
    </div>
  );
}
