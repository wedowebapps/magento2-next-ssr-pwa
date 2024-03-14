import {
  ApplyCouponCode,
  OrderItem,
  OrderPayment,
  Typography,
} from "@/components";
import { CheckoutContext } from "@/context";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";

export interface OrderSummeryProps {}

export const OrderSummery: FC<OrderSummeryProps> = () => {
  const { cartDetails } = useContext(CheckoutContext);
  const router = useRouter();

  return (
    <div className="card bg-base-100 shadow-[0_0px_40px_-22px_rgba(0,0,0,0.3)]">
      <div className="card-body flex flex-col gap-4 ">
        <div className="flex flex-col gap-2 card bg-base-200 p-4 rounded">
          <div className="border-b-2 border-neutral-200">
            <Typography variant="h6" className="pb-2">
              Order Summery
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            {cartDetails?.items?.map((cartProduct, index) => (
              <OrderItem key={index} cartProduct={cartProduct} />
            ))}
          </div>
        </div>
        <ApplyCouponCode />
        <OrderPayment prices={cartDetails?.prices} />
        <button
          className="btn disabled:opacity-95 bg-primary-500 text-white hover:text-primary-500"
          onClick={() => router.replace("/thank-you")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
