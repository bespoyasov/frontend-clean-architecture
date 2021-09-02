import { Product } from "../domain/product";

export const cookies: Product[] = [
  {
    id: "1",
    title: "Cocoa",
    price: 5000,
    toppings: ["cocoa"],
  },
  {
    id: "2",
    title: "Cherry",
    price: 15000,
    toppings: ["cherry"],
  },
  {
    id: "3",
    title: "Marshmallow",
    price: 25000,
    toppings: ["marshmallow"],
  },
  {
    id: "4",
    title: "Peanuts",
    price: 18000,
    toppings: ["peanuts"],
  },
  {
    id: "5",
    title: "Peanuts, Cherry, Cocoa",
    price: 29000,
    toppings: ["peanuts", "cherry", "cocoa"],
  },
  {
    id: "6",
    title: "Chocolate & Cherry",
    price: 24000,
    toppings: ["chocolate", "cherry"],
  },
  {
    id: "7",
    title: "Marshmallow & Peanuts",
    price: 24000,
    toppings: ["marshmallow", "peanuts"],
  },
  {
    id: "8",
    title: "Chocolate & Peanuts",
    price: 24000,
    toppings: ["chocolate", "peanuts"],
  },
];
