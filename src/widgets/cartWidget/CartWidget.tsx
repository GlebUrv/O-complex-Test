import type { IProductData } from "@/entities/product";
import styles from "./CartWidget.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { createOrderThunk } from "@/entities/order/api/orderThunkApi";

interface CartWidgetProps {
  orders: { product: IProductData; qty: number }[];
}

export function CartWidget({ orders }: CartWidgetProps): React.JSX.Element {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedPhone = localStorage.getItem("saved_phone");
    // const savedOrders = localStorage.getItem("cart_orders");

    if (savedPhone) setPhone(savedPhone);
    // if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  function phoneTest(phone: string): boolean {
    const regexp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
    const result = regexp.test(phone);
    return !!result;
  }

  async function orderHandler(): Promise<void> {
    if (!phone) {
      alert("Нужно ввести телефон");
      return;
    }

    const check = phoneTest(phone);

    if (!check) {
      alert("Введите корректный номер телефона");
      return;
    }

    const items = orders.map((order) => {
      return { quantity: order.qty, id: order.product.id };
    });

    if (items.length < 1) {
      alert("Добавьте товары в корзину");
      return;
    }

    const orderData = { phone, cart: items };

    try {
      const result = await dispatch(createOrderThunk(orderData));
      if (result.payload?.success === 1) {
        alert("Заказ отправлен");
        localStorage.removeItem("saved_phone");
      } else {
        alert(result.payload?.error);
      }
    } catch (error) {
      alert("Ошибка при отправке заказа");
      console.error(error);
    }
  }

  function formatPhone(value: string): string {
    if (value[0] === "+" && value[1] === "7") {
      return value;
    } else if (value[0] === "7") {
      return "+" + value;
    } else {
      return "+7" + value;
    }
  }

  return (
    <div className={styles.cart}>
      <h2>Добавленные товары:</h2>
      <div className={styles.orderList}>
        {orders.map((order) => (
          <div key={order.product.id} className={styles.orderLine}>
            <div className={styles.orderDetails}>
              <div>{order.product.title}</div>
              <div>x{order.qty}</div>
            </div>
            <div>{order.product.price * order.qty} ₽</div>
          </div>
        ))}
      </div>
      <div className={styles.orderActions}>
        <input
          type="phone"
          className={styles.buyBtn}
          placeholder="+7 (___) ___ __-__"
          value={phone}
          onChange={(e) => {
            const newPhone = formatPhone(e.target.value);
            setPhone(newPhone);
            localStorage.setItem("saved_phone", newPhone);
          }}
        />
        <button className={styles.buyBtn} onClick={() => orderHandler()}>
          Заказать
        </button>
      </div>
    </div>
  );
}
