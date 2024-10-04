import { Input, Textarea } from "@/components/ui";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components/form-textarea";
import { FormInput } from "../form-components/form-input";

interface Props {
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Адреса" />
        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Коментар до замовлення"
        />
      </div>
    </WhiteBlock>
  );
};
