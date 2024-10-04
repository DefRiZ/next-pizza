"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSidebar, Container, Title } from "@/components/shared";
import { useCart } from "@/hooks";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPrersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutAdressForm } from "@/components/shared/checkout/checkout-adress-form";
import {
  checkoutFormSchema,
  CheckoutFormType,
} from "@/components/shared/checkout/checkout-form-schema";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { totalAmount, items, loading, updateItemQuantity, removeCartItem } =
    useCart();

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormType) => {
    console.log(data);
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container>
      <Title
        text="Оформлення замовлення"
        className="font-extrabold text-[36px] mb-8"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left part */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />
              <CheckoutPrersonalForm
                className={cn({ "opacity-40 pointer-none": loading })}
              />
              <CheckoutAdressForm
                className={cn({ "opacity-40 pointer-none": loading })}
              />
            </div>
            {/* Right part */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
