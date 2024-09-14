import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSize } from "@/lib/get-available-pizza-size";
import { ProductItem } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngr: Set<number>;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngridient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]) => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngr, { toggle: addIngridient }] = useSet(new Set<number>([]));

  const availablePizzaSizes = getAvailablePizzaSize(type, items);

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );

    const availableSize = availablePizzaSizes.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngr,
    availablePizzaSizes,
    setSize,
    setType,
    addIngridient,
  };
};
