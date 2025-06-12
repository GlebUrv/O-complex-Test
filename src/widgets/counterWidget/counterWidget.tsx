import type { IProductData } from "@/entities/product";
import styles from "./counterWidget.module.css";
import { type Dispatch, type SetStateAction } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { removeItem, updateQuantity } from "@/entities/order/slice/orderSlice";

interface Props {
  product: IProductData;
  counterValue: number;
  setCounterValue: Dispatch<SetStateAction<number>>;
}

export function CounterWidget({
  product,
  counterValue,
  setCounterValue,
}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.counterBlock}>
      <button
        className={styles.buyBtn}
        onClick={() => {
          const newQty = counterValue - 1;
          setCounterValue(newQty);
          if (newQty > 0) {
            dispatch(updateQuantity({ product, qty: newQty }));
          } else {
            dispatch(removeItem({ product, qty: newQty }));
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
            dispatch(updateQuantity({ product, qty: newQty }));
          } else {
            dispatch(removeItem({ product, qty: newQty }));
          }
        }}
      />
      <button
        className={styles.buyBtn}
        onClick={() => {
          const newQty = counterValue + 1;
          setCounterValue(newQty);
          dispatch(updateQuantity({ product, qty: newQty }));
        }}
      >
        +
      </button>
    </div>
  );
}
