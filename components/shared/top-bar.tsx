import React from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface Props {
  items: Category[];
  classname?: string;
}
export const TopBar: React.FC<Props> = ({ items, classname }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        classname
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={items} />
        <SortPopup />
      </Container>
    </div>
  );
};
