import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

//Пропси для рендж слайдеру
interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFiltersProps extends PriceRangeProps {
  selectedSizes: string;
  selectedTypes: string;
  ingridients: string;
}

export interface Filters {
  priceRange: PriceRangeProps;
  selectedSizes: Set<string>;
  selectedTypes: Set<string>;
  selectedIngridients: Set<string>;
}

export interface ReturnProps extends Filters {
  setPriceRange: (name: keyof PriceRangeProps, value: number) => void;
  toggleIngridients: (value: string) => void;
  toggleTypes: (value: string) => void;
  toggleSize: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFiltersProps,
    string
  >;
  // Фільтр для вибору типу тіста піцци
  const [selectedTypes, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("selectedTypes")
        ? searchParams.get("selectedTypes")?.split(",")
        : []
    )
  );
  // Фільтр для вибору розміру піцци
  const [selectedSizes, { toggle: toggleSize }] = useSet(
    new Set<string>(
      searchParams.has("selectedSizes")
        ? searchParams.get("selectedSizes")?.split(",")
        : []
    )
  );
  // Фільтр для рендж слайдеру
  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    // Створити новий об'єкт, щоб оновити стейт
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };
  // Фільтр для вибору інгридієнтів
  const [selectedIngridients, { toggle: toggleIngridients }] = useSet(
    new Set<string>(searchParams.get("ingridients")?.split(","))
  );

  return React.useMemo(
    () => ({
      priceRange,
      selectedTypes,
      selectedSizes,
      selectedIngridients,
      setPriceRange: updatePrice,
      toggleIngridients,
      toggleTypes,
      toggleSize,
    }),
    [selectedSizes, selectedTypes, selectedIngridients, priceRange]
  );
};
