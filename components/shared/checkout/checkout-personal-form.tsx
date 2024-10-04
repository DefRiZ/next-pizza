import { Input } from "@/components/ui";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components/form-input";

interface Props {
  className?: string;
}

export const CheckoutPrersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональні дані" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Ім'я" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Прізвище"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
