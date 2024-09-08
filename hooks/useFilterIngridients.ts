import { Api } from "@/services/api-client";
import { Ingridient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

type ReturnProps = {
  ingridients: Ingridient[];
  selectedIds: Set<string>;
  toggleCheckboxById: (id: string) => void;
  // loading: boolean;
};

export const useFilterIngridients = (): ReturnProps => {
  const [ingridients, setIngridients] = React.useState<Ingridient[]>([]);
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));
  // const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // setLoading(true);
    Api.ingridients
      .getAllIngridients()
      .then((res) => {
        setIngridients(res);
      })
      .catch((err) => console.error(err));
    // .finally(() => setLoading(false));
  }, []);

  return {
    ingridients,
    selectedIds,
    toggleCheckboxById: toggle,
    // loading
  };
};
