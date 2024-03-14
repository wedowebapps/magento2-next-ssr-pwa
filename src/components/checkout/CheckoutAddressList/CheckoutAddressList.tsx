"use client";
import { Typography } from "@/components";
import { CustomerAddress } from "@/types";
import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";

export interface CheckoutAddressListProps {
  items: CustomerAddress | CustomerAddress[];
  name: string;
  handleAddressSelected?: (value: CustomerAddress) => void;
}
export interface AddressListItemProps {
  address: CustomerAddress;
  selected: boolean;
  onClick: () => void;
}

const AddressListItem: FC<AddressListItemProps> = ({
  address,
  selected,
  onClick,
}) => {
  const street = Array.isArray(address?.street) ? address?.street : "";

  const addressArray = [
    street,
    address?.city,
    address?.region?.region,
    address?.country_code,
    address?.postcode,
  ]
    .filter((x) => x)
    .join(", ");

  return (
    <div
      className={clsx("flex flex-col gap-2 bg-white p-2 border-2 rounded", [
        { "border-primary-500": selected },
      ])}
      onClick={onClick}
      role="button"
    >
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

export const CheckoutAddressList: FC<CheckoutAddressListProps> = ({
  items,
  name,
  handleAddressSelected,
}) => {
  const [selected, setSelected] = useState<number>();
  const AddressList = useMemo(
    () => (Array.isArray(items) ? items : [items]),
    [items],
  );

  useEffect(() => {
    if (selected) {
      const filteredAddress = AddressList[selected];
      handleAddressSelected &&
        handleAddressSelected(filteredAddress as CustomerAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AddressList, selected]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 ">
        {AddressList.length ? (
          AddressList?.map((address, index) => (
            <AddressListItem
              key={`${name}-${index}`}
              address={address}
              selected={selected === index}
              onClick={() => setSelected(index)}
            />
          ))
        ) : (
          <div>
            <Typography variant="p">
              Address not save in your address book.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
