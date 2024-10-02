import { CartItemDTO } from "@/services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingridientsPrice = item.ingridients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (ingridientsPrice + item.productItem.price) * item.quantity;
};
