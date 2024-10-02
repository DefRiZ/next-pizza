import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingridient } from "@prisma/client";

interface Props {
  className?: string;
  id: number;
  name: string;
  price: number;
  ingridients: Ingridient[];
  imageUrl: string;
}

export const ProductCard: React.FC<Props> = ({
  className,
  imageUrl,
  id,
  price,
  name,
  ingridients,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary h-[260px] rounded-lg ">
          <img className="w-[250px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingridients.map((ingridient) => ingridient.name).join(", ")}
        </p>

        <div className="flex justify-between mt-4">
          <span className="text-[20px]">
            від <b> {price}</b> ₴
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Додати
          </Button>
        </div>
      </Link>
    </div>
  );
};
