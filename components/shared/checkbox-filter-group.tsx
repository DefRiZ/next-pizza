"use client";

import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { ingredients } from "@/prisma/constants";
// import { it } from "node:test";

type Item = FilterChecboxProps;

interface Props {
  className?: string;
  title: string;
  name?: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  // loading: boolean;
  onClickCheckbox?: (id: string) => void;
  selectedIds?: Set<string>;
  defaultValue?: string[];
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  className,
  title,
  name,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Пошук",
  // loading,
  onClickCheckbox,
  selectedIds,
  defaultValue,
}) => {
  // Пошукова система
  const [searchValue, setSearchValue] = React.useState("");
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  // Показує всі елементи, або показує 5 перших
  const [showAll, setShowAll] = React.useState(false);
  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  if (list.length === 0) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
        <Skeleton className="h-6 w-28 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        {showAll && (
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 max-h-96 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Сховати" : "Показати всі"}
          </button>
        </div>
      )}
    </div>
  );
};
