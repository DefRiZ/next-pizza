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
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingridient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngr, { toggle: addIngridient }] = useSet(new Set<number>([]));

  //Формуємо деталі піци
  const textDetaills = `${size} см, ${mapPizzaType[type]} тісто`;

  //Формуємо ціну піци
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngrPrice = ingredients
    .filter((item) => selectedIngr.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);
  const totalPrice = pizzaPrice + totalIngrPrice;

  // Формуємо список доступних розмірів для поточного типу піци
  // availablePizza - список доступних піц з поточним типом
  const availablePizza = items.filter((item) => item.pizzaType === type);

  // availablePizzaSizes - список доступних розмірів
  const availablePizzaSizes = pizzaSizes.map((item) => {
    return {
      name: item.name,
      value: item.value,
      // розмір недоступний, якщо не знайдена піца з поточним розміром
      disabled: !availablePizza.some(
        (pizza) => Number(pizza.size) === Number(item.value)
      ),
    };
  });

  React.useEffect(() => {
    const isDisabledSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );

    const availableSize = availablePizzaSizes.find((item) => !item.disabled);

    if (!isDisabledSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const onClickConsole = () => {
    console.log({
      size,
      type,
      selectedIngr,
    });
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
          onClick={onClickConsole}
          className="h-[55px] px-10  text-base rounded-[18px] w-full mt-10"
        >
          Додати у кошик за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
