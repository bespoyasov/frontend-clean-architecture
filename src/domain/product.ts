export type ProductTitle = string;
export type Product = {
  id: UniqueId;
  title: ProductTitle;
  price: PriceCents;
  toppings: Ingredient[];
};

export const ingredients: Record<Ingredient, string> = {
  chocolate: "Chocolate",
  cocoa: "Cocoa",
  cherry: "Cherry",
  marshmallow: "Mashmallow",
  peanuts: "Peanuts",
};

export function totalPrice(products: Product[]): PriceCents {
  return products.reduce((total, { price }) => total + price, 0);
}
