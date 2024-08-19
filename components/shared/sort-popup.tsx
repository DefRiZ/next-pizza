import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import React from "react";

interface Props {
  classname?: string;
}

export const SortPopup: React.FC<Props> = ({ classname }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
        classname
      )}
    >
      <ArrowDown size={16} />
      <b>Сортування за:</b>
      <b className="text-primary">популярностю</b>
    </div>
  );
};
