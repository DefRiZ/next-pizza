"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  // const onAddProduct = () => {
  //   try {
  //     addCartItem({
  //       productItemId: firstItem.id,
  //     });
  //     toast.success("Товар додано до кошика");
  //     router.back();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Не вдалося додати продукт");
  //   }
  // };
  // const onAddPizza = async (productItemId: number, ingridients: number[]) => {
  //   try {
  //     await addCartItem({
  //       productItemId,
  //       ingridients,
  //     });
  //     toast.success("Піццу додано до кошика");
  //     router.back();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Не вдалося додати піццу");
  //   }
  // };

  const onSubmit = async (productItemId?: number, ingridients?: number[]) => {
    // if (isPizzaForm) {
    //   try {
    //     await addCartItem({
    //       productItemId,
    //       ingridients,
    //     });
    //     toast.success("Піццу додано до кошика");
    //     router.back();
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Не вдалося додати піццу");
    //   }
    // } else {
    //   try {
    //     addCartItem({
    //       productItemId: firstItem.id,
    //     });
    //     toast.success("Товар додано до кошика");
    //     router.back();
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Не вдалося додати продукт");
    //   }
    // }
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingridients: ingridients,
      });
      toast.success("Продукт додано до кошика");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося додати продукт");
    }
  };
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby="modal-description"
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle></DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm
            onClickSubmit={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingridients}
            items={product.items}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            onClickSubmit={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
