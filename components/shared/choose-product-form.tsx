"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onClickSubmit?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  loading,
  onClickSubmit,
}) => {
  return (
    <div className={className}>
      <div className={cn(className, "flex flex-1 h-[490px]")}>
        <div className="flex items-center justify-center flex-1 relative w-full">
          <img
            src={imageUrl}
            alt={name}
            className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          />
        </div>

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={name} size="md" className="font-extrabold mb-1" />
          <Button
            onClick={() => onClickSubmit?.()}
            className="h-[55px] px-10  text-base rounded-[18px] w-full mt-10"
          >
            Додати у кошик за {price} ₴
          </Button>
        </div>
      </div>
    </div>
  );
};
