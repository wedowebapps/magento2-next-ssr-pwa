import { CartPricesType } from "@/types";
import { currencyFormatter } from "@/utils/helper";
import { FC } from "react";

export interface OrderPaymentProps {
  prices: CartPricesType;
}

export const OrderPayment: FC<OrderPaymentProps> = ({ prices }) => {
  return (
    <div className="flex flex-col gap-1 card bg-base-200 p-4 rounded first-letter:uppercase">
      <div className="grid grid-cols-2">
        <span className="first-letter:uppercase">subtotal</span>
        <span className="text-right">
          {currencyFormatter({
            currency: prices?.subtotal_excluding_tax?.currency,
            number: prices?.subtotal_excluding_tax?.value ?? 0,
          })}
        </span>
      </div>
      <div className="grid grid-cols-2">
        <span className="first-letter:uppercase">Shipping & Handling</span>
        <span className="text-right">
          {currencyFormatter({
            currency: prices?.estimatedShipping?.amount?.currency,
            number: prices?.estimatedShipping?.amount?.value ?? 0,
          })}
        </span>
      </div>
      <div className="grid grid-cols-2">
        <span className="first-letter:uppercase">Discounts</span>
        <span className="text-right">
          {currencyFormatter({
            currency: prices?.discount?.amount?.currency,
            number: prices?.discount?.amount?.value ?? 0,
          })}
        </span>
      </div>
      <div className="grid grid-cols-2 pt-2">
        <span className="text-lg first-letter:uppercase">Grand Total :</span>
        <span className="text-right">
          {currencyFormatter({
            currency: prices?.grand_total?.currency,
            number: prices?.grand_total?.value ?? 0,
          })}
        </span>
      </div>
    </div>
  );
};
