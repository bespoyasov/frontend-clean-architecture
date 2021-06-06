import {
  CartStorageService,
  OrdersStorageService,
  UserStorageService,
} from "../application/ports";
import { useStore } from "./store";

// We could split the storage here,
// or access different storages,
// or apply some memoization or performance tricks...
// Well, you get the idea.

export function useUserStorage(): UserStorageService {
  return useStore();
}

export function useCartStorage(): CartStorageService {
  return useStore();
}

export function useOrdersStorage(): OrdersStorageService {
  return useStore();
}
