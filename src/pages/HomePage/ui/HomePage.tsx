import { useAppDispatch } from "@/shared/hooks";
import styles from "./HomePage.module.css";
import { useEffect, useLayoutEffect } from "react";
import { getReviewsThunk } from "@/entities/review/api/reviewThunkApi";
import { CartWidget, ProductListWidget, ReviewWidget } from "@/widgets";
import { getProductsThunk } from "@/entities/product/api/productThunkApi";

export function HomePage(): React.JSX.Element {
  useLayoutEffect(() => {
    document.title = "Главная";
  }, []);

  const dispatch = useAppDispatch();

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
        <CartWidget />
        <ProductListWidget />
      </div>
    </div>
  );
}
