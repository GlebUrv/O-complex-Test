import type { IProductData } from "@/entities/product";
import styles from "./counterWidget.module.css";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  product: IProductData;
  counterValue: number;
  setCounterValue: Dispatch<SetStateAction<number>>;
  orders: { product: IProductData; qty: number }[] | [];
  setOrders: React.Dispatch<
    React.SetStateAction<{ product: IProductData; qty: number }[]>
  >;
}

export function CounterWidget({
  product,
  counterValue,
  setCounterValue,
  orders,
  setOrders,
}: Props): React.JSX.Element {
  return (
    <div className={styles.counterBlock}>
      <button
        className={styles.buyBtn}
        onClick={() => {
          const newQty = counterValue - 1;
          setCounterValue(newQty);
          if (newQty > 0) {
            const newOrders = orders.map((order) => {
              if (order.product === product) {
                order.qty = newQty;
              }
              return order;
            });
            setOrders(newOrders);
          } else {
            setOrders((prev) => prev.filter((el) => el.product !== product));
          }
        }}
      >
        -
      </button>
      <input
        className={styles.buyBtn}
        type="text"
        value={counterValue}
        onChange={(e) => {
          const newQty = Number(e.target.value);
          setCounterValue(newQty);
          if (newQty > 0) {
            const newOrders = orders.map((order) => {
              if (order.product === product) {
                order.qty = newQty;
              }
              return order;
            });
            setOrders(newOrders);
          } else {
            setOrders((prev) => prev.filter((el) => el.product !== product));
          }
        }}
      />
      <button
        className={styles.buyBtn}
        onClick={() => {
          const newQty = counterValue + 1;
          setCounterValue(newQty);
          const newOrders = orders.map((order) => {
            if (order.product === product) {
              order.qty = newQty;
            }
            return order;
          });
          setOrders(newOrders);
        }}
      >
        +
      </button>
    </div>
  );
}
