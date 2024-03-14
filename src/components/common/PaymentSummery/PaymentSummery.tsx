"use client";
import { Typography } from "@/components";
import { useCartContext } from "@/context";
import { currencyFormatter } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FC } from "react";

export interface PaymentSummeryProps {}

export const PaymentSummery: FC<PaymentSummeryProps> = () => {
  const router = useRouter();
  const { cartDetails } = useCartContext();

  return (
    <div className="card min-w-fit bg-base-100 shadow-[0_0px_40px_-22px_rgba(0,0,0,0.3)]">
      <div className="card-body flex flex-col gap-4">
        <div className="card-title">
          <Typography variant="h4">The total amount of</Typography>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <span>Subtotal</span>
              <span>
                {currencyFormatter({
                  currency:
                    cartDetails?.prices?.subtotal_excluding_tax?.currency,
                  number:
                    cartDetails?.prices?.subtotal_excluding_tax?.value ?? 0,
                })}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Shipping & Handling</span>
              <span>
                {currencyFormatter({
                  currency:
                    cartDetails?.prices?.estimatedShipping?.amount?.currency,
                  number:
                    cartDetails?.prices?.estimatedShipping?.amount?.value ?? 0,
                })}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>Discounts</span>
              <span>
                {currencyFormatter({
                  currency: cartDetails?.prices?.discount?.amount?.currency,
                  number: cartDetails?.prices?.discount?.amount?.value ?? 0,
                })}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between">
            <span>Grand Total</span>
            <span>
              {currencyFormatter({
                currency: cartDetails?.prices?.grand_total?.currency,
                number: cartDetails?.prices?.grand_total?.value ?? 0,
              })}
            </span>
          </div>
        </div>
        <button
          className="btn bg-primary-500 text-white hover:bg-gray-700"
          onClick={() => router.push("/checkout")}
        >
          Go To Checkout
        </button>
      </div>
    </div>
  );
};
