import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Ім'я повинно містити не менше 2 символів",
  }),
  lastName: z.string().min(2, {
    message: "Прізвище повинно містити не менше 2 символів",
  }),
  email: z.string().email({
    message: "Невірний формат електронної пошти",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Номер телефону повинен містити не менше 10 цифр",
    })
    .max(10, {
      message: "Номер телефону повинен містити не більше 10 цифр",
    }),
  address: z.string().min(5, {
    message: "Адреса повинна містити не менше 5 символів",
  }),
  comment: z.string().optional(),
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
