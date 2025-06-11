import DOMPurify from "dompurify";
import { useAppSelector } from "@/shared/hooks";
import styles from "./reviewWidget.module.css";

export function ReviewWidget(): React.JSX.Element {
  const { reviews } = useAppSelector((store) => store.reviews);

  return (
    <div className={styles.reviewsList}>
      {reviews.map((rev) => (
        <div key={rev.id} className={styles.reviewCard}>
          <div>Отзыв {rev.id}</div>
          <div>Получено с API</div>
          <div>HTML</div>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rev.text) }}
          />
        </div>
      ))}
    </div>
  );
}
