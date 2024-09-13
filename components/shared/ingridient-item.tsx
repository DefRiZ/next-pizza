import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngridientItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        { "border border-primary": active },
        className
      )}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={75} height={75} src={imageUrl} alt="ingredient" />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
