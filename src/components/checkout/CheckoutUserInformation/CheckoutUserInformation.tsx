import { FC } from "react";
import { Identification, ShippingDetails } from "@/components";

export interface CheckoutUserInformationProps {}

export const CheckoutUserInformation: FC<CheckoutUserInformationProps> = () => {
  return (
    <div className="flex flex-col gap-4">
      <Identification />
      <ShippingDetails />
    </div>
  );
};
