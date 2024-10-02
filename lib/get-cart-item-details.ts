import { Ingridient } from "@prisma/client";
import { PizzaSize, PizzaType, mapPizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingridients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingridients) {
    details.push(...ingridients.map((ingridient) => ingridient.name));
  }

  return details.join(", ");
};
