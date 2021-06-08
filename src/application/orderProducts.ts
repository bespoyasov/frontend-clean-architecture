import { User } from "../domain/user";
import { Cart } from "../domain/cart";
import { createOrder } from "../domain/order";

import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  // We can also access the user and their cart product via hooks here
  // and don't pass them as function arguments.

  async function orderProducts(user: User, cart: Cart) {
    // We can validate the data and check if there are no cookies.

    const order = createOrder(user, cart.products);
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("Оплата не прошла 🤷");

    // We can save the order on the remote server, if necessary.

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
