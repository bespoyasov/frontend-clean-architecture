import { Cookie } from "./product";

export type Cart = {
  products: Cookie[];
};

export function addProduct(cart: Cart, product: Cookie): Cart {
  return { ...cart, products: [...cart.products, product] };
}

export function contains(cart: Cart, product: Cookie): boolean {
  return cart.products.some(({ id }) => id === product.id);
}
