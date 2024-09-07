"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

type Props = {
  className?: string;
};

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);

  // Функція, яка викликається при кліку за межами діва з пошуковим полем
  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const res = await Api.products.search(searchQuery);
        setProducts(res);
      } catch (error) {
        console.error(error);
      }
    },
    350,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-30"></div>
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-500" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Пошук"
          className="w-full rounded-2xl outline-none bg-gray-50 pl-11"
          onClick={() => setFocused(true)}
        />
        {/* Popup */}
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-4 px-3 py-2 hover:bg-primary/10 "
                href={`/product/${product.id}`}
              >
                <img
                  className="w-8 h-8 rounded-sm"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
