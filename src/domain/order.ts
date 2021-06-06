import { currentDatetime } from "../lib/datetime";
import { Cookie, totalPrice } from "./product";
import { User } from "./user";

export type OrderStatus = "new" | "delivery" | "completed";

export type Order = {
  user: UniqueId;
  products: Cookie[];
  created: DateTimeString;
  status: OrderStatus;
  total: PriceCents;
};

export function createOrder(user: User, products: Cookie[]): Order {
  return {
    user: user.id,
    products,
    created: currentDatetime(),
    status: "new",
    total: totalPrice(products),
  };
}
