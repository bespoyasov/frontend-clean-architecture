import { User } from "../domain/user";
import { Cookie } from "../domain/product";
import { createOrder } from "../domain/order";

import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  async function orderProducts(user: User, cookies: Cookie[]) {
    const order = createOrder(user, cookies);
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("Оплата не прошла 🤷");

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
