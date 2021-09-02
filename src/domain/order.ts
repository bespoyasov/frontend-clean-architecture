import { currentDatetime } from "../lib/datetime";
import { Product, totalPrice } from "./product";
import { Cart } from "./cart";
import { User } from "./user";

export type OrderStatus = "new" | "delivery" | "completed";

export type Order = {
  user: UniqueId;
  products: Product[];
  created: DateTimeString;
  status: OrderStatus;
  total: PriceCents;
};

export function createOrder(user: User, { products }: Cart): Order {
  return {
    user: user.id,
    products,
    created: currentDatetime(),
    status: "new",
    total: totalPrice(products),
  };
}
