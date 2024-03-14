"use client";
import { BillingAddress, Checkbox, ShippingAddress } from "@/components";
import { FC, useState } from "react";

export interface ShippingDetailsProps {}

export const ShippingDetails: FC<ShippingDetailsProps> = () => {
  const [isBillingAddressSame, setIsBillingAddressSame] = useState(false);

  return (
    <div className="flex flex-col gap-8 card bg-base-200  p-4 rounded">
      <ShippingAddress isBillingAddressSame={isBillingAddressSame} />

      <Checkbox
        name="isBillingAddressSame"
        label="Billing address same as shipping address"
        defaultChecked={isBillingAddressSame}
        onChange={() => setIsBillingAddressSame((prev) => !prev)}
      />
      {isBillingAddressSame && <BillingAddress />}
    </div>
  );
};
