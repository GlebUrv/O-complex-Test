import { useAppDispatch } from "@/shared/hooks";
import styles from "./HomePage.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { getReviewsThunk } from "@/entities/review/api/reviewThunkApi";
import { CartWidget, ProductListWidget, ReviewWidget } from "@/widgets";
import { getProductsThunk } from "@/entities/product/api/productThunkApi";
import type { IProductData } from "@/entities/product";

export function HomePage(): React.JSX.Element {
  useLayoutEffect(() => {
    document.title = "Главная";
  }, []);

  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<
    { product: IProductData; qty: number }[] | []
  >([]);

  useEffect(() => {
    dispatch(getReviewsThunk());
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.topBlock}>
        <h1>тестовое задание</h1>
        <ReviewWidget />
      </div>
      <div className={styles.bottomBlock}>
        <CartWidget orders={orders} />
        <ProductListWidget orders={orders} setOrders={setOrders} />
      </div>
    </div>
  );
}
