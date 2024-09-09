import { Api } from "@/services/api-client";
import { Ingridient } from "@prisma/client";
import React from "react";

export const useIngridients = () => {
  const [ingridients, setIngridients] = React.useState<Ingridient[]>([]);

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
