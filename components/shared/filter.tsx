import React from "react";
import { Title } from "./title";
import { CheckboxFilterGroup, FilterCheckbox, RangeSlider } from "./index";
import { Input } from "../ui";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />
      {/* Checkbox */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно збирати" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Price */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={3000}
            defaultValue={0}
          />
          <Input type="number" placeholder="3000" min={100} max={3000} />
        </div>
        <RangeSlider min={0} max={3000} step={10} value={[0, 3000]} />
      </div>

      {/* Ingredients */}

      <CheckboxFilterGroup
        title="Інгредієнти"
        className="mt-5"
        limit={6}
        defaultItems={[
          { text: "Сир", value: "1" },
          { text: "Сметана", value: "2" },
          { text: "Сир", value: "3" },
          { text: "Сметана", value: "4" },
          { text: "Сир", value: "5" },
          { text: "Сметана", value: "6" },
        ]}
        items={[
          { text: "Сир", value: "1" },
          { text: "Сметана", value: "2" },
          { text: "Сир", value: "3" },
          { text: "Сметана", value: "4" },
          { text: "Сир", value: "5" },
          { text: "Сметана", value: "6" },
          { text: "Сир", value: "1" },
          { text: "Сметана", value: "2" },
          { text: "Сир", value: "3" },
          { text: "Сметана", value: "4" },
          { text: "Сир", value: "5" },
          { text: "Сметана", value: "6" },
        ]}
      />
    </div>
  );
};
