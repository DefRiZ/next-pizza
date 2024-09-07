import { Api } from "@/services/api-client";
import { Ingridient } from "@prisma/client";
import React from "react";

type ReturnProps = {
  ingridients: Ingridient[];
  // loading: boolean;
};

export const useFilterIngridients = (): ReturnProps => {
  const [ingridients, setIngridients] = React.useState<Ingridient[]>([]);
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
    // loading
  };
};
