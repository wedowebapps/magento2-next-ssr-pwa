import { Typography } from "@/components";
import { CartItemType } from "@/types";
import { currencyFormatter } from "@/utils/helper";
import Image from "next/image";
import { FC } from "react";

export interface OrderItemProps {
  cartProduct: CartItemType;
}

export const OrderItem: FC<OrderItemProps> = ({ cartProduct }) => {
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-2">
        <Image
          src={cartProduct?.product?.thumbnail?.url}
          alt={cartProduct?.product?.thumbnail?.label ?? "product-image"}
          width={1000}
          height={1000}
          className="h-16 w-16 object-contain"
        />

        <Typography
          variant="p"
          className="text-primary-500 line-clamp-2 max-h-12"
        >
          {cartProduct?.product?.name}
        </Typography>
      </div>
      <div>
        <div>{`x${cartProduct?.quantity}`}</div>
        <div>
          {currencyFormatter({
            number: cartProduct?.prices?.price?.value ?? 0,
            currency: cartProduct?.prices?.price?.currency,
          })}
        </div>
      </div>
    </div>
  );
};
