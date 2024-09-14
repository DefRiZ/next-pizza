import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingridient, ProductItem } from "@prisma/client";

/**
 * Функція для розрахунку ціни піци
 * @param size // розмір піци
 * @param type // тип піци
 * @param items // варіації піци
 * @param ingredients // список інгредієнтів
 * @param selectedIngr // список вибраних інгредієнтів
 * @returns ціну піци
 */
export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingridient[],
  selectedIngr: Set<number>
) => {
  //Формуємо ціну піци
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngrPrice = ingredients
    .filter((item) => selectedIngr.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);
  return pizzaPrice + totalIngrPrice;
};
