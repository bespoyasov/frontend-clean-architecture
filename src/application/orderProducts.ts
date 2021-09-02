import { User } from "../domain/user";
import { Cart } from "../domain/cart";
import { createOrder } from "../domain/order";

// Обратите внимание, что интерфейсы портов находятся в _прикладном слое_,
// а вот их реализация — в слое _адаптеров_.
import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
  // Обычно получение сервисов работает через Dependency Injection.
  // Тут мы можем использовать хуки как кустарный ”DI-контейнер“.
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  // Можем также получить `user` и `cart` прямо тут через соответствующие хуки
  // и не передавать их как аргументы к функции.

  // В идеале мы бы передали аргументом команду,
  // которая бы инкапсулировала все входные данные.
  async function orderProducts(user: User, cart: Cart) {
    // Здесь мы можем провалидировать данные перед созданием заказа.

    const order = createOrder(user, cart);

    // Функция юз-кейса не вызывает сторонние сервисы напрямую,
    // вместо этого она полагается на интерфейсы, которые объявлены ранее.
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("Оплата не прошла 🤷");

    // А тут можем сохранить заказ на сервере, если нужно.

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
