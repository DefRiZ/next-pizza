import { Ingridient } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getAllIngridients = async (): Promise<Ingridient[]> => {
  return (await axiosInstance.get<Ingridient[]>(ApiRoutes.GET_ALL_INGRIDIENTS))
    .data;
};
