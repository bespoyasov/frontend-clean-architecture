import {
  CartStorageService,
  OrdersStorageService,
  UserStorageService,
} from "../application/ports";
import { useStore } from "./store";

// Можно разделить общий сторадж на несколько.
// Внутри соответствующих хуков можем применить
// мемоизацию, оптимизации, селекторы...
// Нувыпоняли.

export function useUserStorage(): UserStorageService {
  return useStore();
}

export function useCartStorage(): CartStorageService {
  return useStore();
}

export function useOrdersStorage(): OrdersStorageService {
  return useStore();
}
