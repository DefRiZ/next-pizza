"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants, IngridientItem, PizzaImage } from ".";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/constants/pizza";
import { Ingridient, ProductItem } from "@prisma/client";
import { usePizzaOptions } from "@/hooks";
import { getPizzaDetails } from "@/lib/get-pizza-details";
import { ingredients } from "@/prisma/constants";

interface Props {
  loading?: boolean;
  imageUrl: string;
  name: string;
  ingredients: Ingridient[];
  items: ProductItem[];
  onClickSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  loading,
  imageUrl,
  name,
  ingredients,
  items,
  onClickSubmit,
}) => {
  const {
    size,
    type,
    selectedIngr,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngridient,
  } = usePizzaOptions(items);
  //Формуємо деталі піци
  const { textDetaills, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngr
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onClickSubmit(currentItemId, Array.from(selectedIngr));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[300px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-1">
            {ingredients.map((ingredient) => (
              <IngridientItem
                onClick={() => addIngridient(ingredient.id)}
                active={selectedIngr.has(ingredient.id)}
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10  text-base rounded-[18px] w-full mt-10"
        >
          Додати у кошик за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
