import { Product } from "../domain/product";
import { hasAllergy, User } from "../domain/user";
import { addProduct } from "../domain/cart";

import { CartStorageService, NotificationService } from "./ports";
import { useCartStorage } from "../services/storageAdapter";
import { useNotifier } from "../services/notificationAdapter";

export function useAddToCart() {
  const storage: CartStorageService = useCartStorage();
  const notifier: NotificationService = useNotifier();

  function addToCart(user: User, product: Product): void {
    const warning = "Эта печенька опасна для здоровья! 😱";
    const isDangerous = product.toppings.some((item) => hasAllergy(user, item));
    if (isDangerous) return notifier.notify(warning);

    const { cart } = storage;
    const updated = addProduct(cart, product);
    storage.updateCart(updated);
  }

  return { addToCart };
}
