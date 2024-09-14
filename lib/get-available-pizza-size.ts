import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductItem } from "@prisma/client";

export function getAvailablePizzaSize(
  type: PizzaType,
  items: ProductItem[]
): Variant[] {
  // Формуємо список доступних розмірів для поточного типу піци
  // availablePizza - список доступних піц з поточним типом
  const filteredPizzaByType = items.filter((item) => item.pizzaType === type);

  // availablePizzaSizes - список доступних розмірів
  const availablePizzaSizes = pizzaSizes.map((item) => {
    return {
      name: item.name,
      value: item.value,
      // розмір недоступний, якщо не знайдена піца з поточним розміром
      disabled: !filteredPizzaByType.some(
        (pizza) => Number(pizza.size) === Number(item.value)
      ),
    };
  });
  return availablePizzaSizes;
}
