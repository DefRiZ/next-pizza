"use client";
import React from "react";
import { Title } from "./title";
import { CheckboxFilterGroup, RangeSlider } from "./index";
import { Input } from "../ui";
import { useQueryFilters, useFilters, useIngridients } from "@/hooks";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
  const { ingridients } = useIngridients();
  // Айтеми для чекбоксу
  const items = ingridients.map((ingridient) => ({
    text: ingridient.name,
    value: ingridient.id.toString(),
  }));

  //Функція для оновлення рендеру слайдера
  const updatedPrices = (prices: number[]) => {
    filters.setPriceRange("priceFrom", prices[0]);
    filters.setPriceRange("priceTo", prices[1]);
  };

  //Використовуємо кастомний хуй з фільтрами
  const filters = useFilters();

  //Використовуємо хук для рендеру url
  useQueryFilters(filters);

  return (
    <div className={className}>
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />
      {/* Checkbox */}
      <div className="flex flex-col gap-4">
        <CheckboxFilterGroup
          title="Типи тіста"
          name="types"
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
          onClickCheckbox={filters.toggleTypes}
          selectedIds={filters.selectedTypes}
        />
        <CheckboxFilterGroup
          title="Розміри"
          name="sizes"
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
          onClickCheckbox={filters.toggleSize}
          selectedIds={filters.selectedSizes}
        />
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
            value={String(filters.priceRange.priceFrom)}
            onChange={(e) =>
              filters.setPriceRange("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={String(filters.priceRange.priceTo)}
            onChange={(e) =>
              filters.setPriceRange("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.priceRange.priceFrom || 0,
            filters.priceRange.priceTo || 1000,
          ]}
          onValueChange={updatedPrices}
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
        onClickCheckbox={filters.toggleIngridients}
        selectedIds={filters.selectedIngridients}
        // loading={loading}
      />
    </div>
  );
};
