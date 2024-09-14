import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingridient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-pizza-prices";

export function getPizzaDetails(
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingridient[],
  selectedIngr: Set<number>
) {
  const textDetaills = `${size} см, ${mapPizzaType[type]} піцца`;

  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    items,
    ingredients,
    selectedIngr
  );
  return { textDetaills, totalPrice };
}
