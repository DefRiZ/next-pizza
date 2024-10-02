import React from "react";
import qs from "qs";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import { useDeepCompareEffect } from "react-use";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  // Зберігаємо стейт в URL
  useDeepCompareEffect(() => {
    const params = {
      ...filters.priceRange,
      ingridients: Array.from(filters.selectedIngridients),
      selectedSizes: Array.from(filters.selectedSizes),
      selectedTypes: Array.from(filters.selectedTypes),
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters]);
};
