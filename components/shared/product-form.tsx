"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store/cart";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({
  product,
  _onSubmit,
  className,
}) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingridients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingridients: ingridients,
      });

      toast.success("Продукт додано до кошика");

      _onSubmit?.();
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося додати продукт");
    }
  };
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        onClickSubmit={onSubmit}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingridients}
        items={product.items}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      onClickSubmit={onSubmit}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      loading={loading}
    />
  );
};
