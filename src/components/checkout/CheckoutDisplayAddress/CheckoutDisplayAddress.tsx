import { Address } from "@/types";
import { FC } from "react";

export interface CheckoutDisplayAddressProps {
  address: Address;
}

export const CheckoutDisplayAddress: FC<CheckoutDisplayAddressProps> = ({
  address,
}) => {
  const street = Array.isArray(address?.street) ? address?.street : "";

  const addressArray = [
    street,
    address?.city,
    address?.region?.label,
    address?.country?.label,
    address?.postcode,
  ]
    .filter((x) => x)
    .join(", ");

  return (
    <div className={"flex flex-col gap-2 bg-white p-2 border-2 rounded"}>
      <div className="flex gap-2">
        <span className="font-semibold ">{address?.firstname}</span>
        <span className="font-semibold ">{address?.lastname}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <span>{`${addressArray};`}</span>
        </div>

        <span>Phone: {address?.telephone}</span>
      </div>
    </div>
  );
};
