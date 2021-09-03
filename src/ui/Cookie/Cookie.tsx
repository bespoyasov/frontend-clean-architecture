import { contains } from "../../domain/cart";
import { Product } from "../../domain/product";
import { useAddToCart } from "../../application/addToCart";

import { useStore } from "../../services/store";
import styles from "./Cookie.module.css";
import { Toppings } from "./Toppings";

type CookieProps = {
  cookie: Product;
};

export function Cookie({ cookie }: CookieProps) {
  const { user, cart } = useStore();
  const { addToCart } = useAddToCart();

  return (
    <article className={styles.cookie}>
      <span className={styles.image}>🍪</span>
      <span className={styles.title}>{cookie.title}</span>
      <Toppings cookie={cookie} />

      {!!user && (
        <button type="button" onClick={() => addToCart(user, cookie)}>
          {cookie.price / 100} ₽
        </button>
      )}

      {contains(cart, cookie) && <>In your cart</>}
    </article>
  );
}
