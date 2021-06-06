import { totalPrice } from "../../domain/product";
import { useCartStorage } from "../../services/storageAdapter";
import { Cookie } from "../Cookie";
import styles from "./Cart.module.css";

export function Cart() {
  const { cart } = useCartStorage();

  return (
    <section>
      <h2>Корзина</h2>

      <ul className={styles.list}>
        {cart.products.map((product) => (
          <li key={product.id}>
            <Cookie cookie={product} />
          </li>
        ))}
      </ul>

      <p>Итого: {totalPrice(cart.products) / 100} ₽</p>
    </section>
  );
}
