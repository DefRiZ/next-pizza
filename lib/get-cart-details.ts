import { pizzaSizes } from "@/constants/pizza";
import { ingredients } from "@/prisma/constants";
import { CartDTO } from "@/services/dto/cart.dto";
import { Cart } from "@prisma/client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price copy";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    price: calcCartItemTotalPrice(item),
    imageUrl: item.productItem.product.imageUrl,
    disabled: false,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingridients.map((ingridient) => ({
      name: ingridient.name,
      price: ingridient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
