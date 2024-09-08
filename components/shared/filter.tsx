"use client";
import React from "react";
import { Title } from "./title";
import { CheckboxFilterGroup, FilterCheckbox, RangeSlider } from "./index";
import { Input } from "../ui";
import { useFilterIngridients } from "@/hooks/useFilterIngridients";

interface Props {
  className?: string;
}

//Пропси для рендж слайдеру
interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filter: React.FC<Props> = ({ className }) => {
  const {
    ingridients,
    toggleCheckboxById,
    selectedIds,
    // loading
  } = useFilterIngridients();

  // Стейт для рендж слайдеру
  const [priceRange, setPriceRange] = React.useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  /**
   * Оновлює стейт рендж слайдеру
   *
   * @param {keyof PriceRangeProps} name - Ім'я поле стейту, яке потрібно оновити
   * @param {number} value - Нове значення для поля
   */
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    // Створити новий об'єкт, щоб оновити стейт
    setPriceRange({ ...priceRange, [name]: value });
  };

  // Айтеми для чекбоксу
  const items = ingridients.map((ingridient) => ({
    text: ingridient.name,
    value: ingridient.id.toString(),
  }));

  return (
    <div className={className}>
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />
      {/* Checkbox */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="category" text="Можно збирати" value="1" />
        <FilterCheckbox name="category" text="Новинки" value="2" />
      </div>

      {/* Price */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(priceRange.priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(priceRange.priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceRange.priceFrom, priceRange.priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPriceRange({ priceFrom, priceTo })
          }
        />
      </div>

      {/* Ingredients */}

      <CheckboxFilterGroup
        title="Інгредієнти"
        className="mt-5"
        limit={5}
        name="ingridients"
        defaultItems={items.slice(0, 5)}
        items={items}
        onClickCheckbox={toggleCheckboxById}
        selectedIds={selectedIds}
        // loading={loading}
      />
    </div>
  );
};
