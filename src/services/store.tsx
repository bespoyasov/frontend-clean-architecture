import React, { useState } from "react";
import { useContext } from "react";
import { Cookie } from "../domain/product";

const cookies: Cookie[] = [
  {
    id: "1",
    title: "С какао",
    price: 5000,
    toppings: ["cocoa"],
  },
  {
    id: "2",
    title: "Вишнёвая",
    price: 15000,
    toppings: ["cherry"],
  },
  {
    id: "3",
    title: "С зефирками",
    price: 25000,
    toppings: ["marshmallow"],
  },
  {
    id: "4",
    title: "Ореховая",
    price: 18000,
    toppings: ["peanuts"],
  },
  {
    id: "5",
    title: "Супер вкус",
    price: 29000,
    toppings: ["peanuts", "cherry", "cocoa"],
  },
  {
    id: "6",
    title: "Цезарь",
    price: 24000,
    toppings: ["chocolate", "cherry"],
  },
  {
    id: "7",
    title: "Брут",
    price: 24000,
    toppings: ["marshmallow", "peanuts"],
  },
  {
    id: "8",
    title: "Париж",
    price: 24000,
    toppings: ["chocolate", "peanuts"],
  },
];

const StoreContext = React.createContext<any>({});
export const useStore = () => useContext(StoreContext);

export const Provider: React.FC = ({ children }) => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState({ products: [] });
  const [orders, setOrders] = useState([]);

  const value = {
    user,
    cart,
    cookies,
    orders,
    updateUser: setUser,
    updateCart: setCart,
    updateOrders: setOrders,
    emptyCart: () => setCart({ products: [] }),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
