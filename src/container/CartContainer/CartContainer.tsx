"use client";
import {
  EmptyCart,
  PaymentSummery,
  ShoppingList,
  Spinner,
  Typography,
} from "@/components";
import { useCartContext } from "@/context";
import { FC, useEffect, useState } from "react";

export interface CartContainerProps {}

export const CartContainer: FC<CartContainerProps> = () => {
  const { cartDetails, cartLoading } = useCartContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(cartLoading), [cartLoading]);

  return (
    <div className="pt-4 pb-12 px-4 container mx-auto flex flex-col gap-4">
      <div>
        <Typography variant="h1">Shopping Cart</Typography>
      </div>
      <div
        className={
          loading ? "flex justify-center h-full items-center" : "hidden"
        }
      >
        <Spinner size="sm" />
      </div>
      <div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row  gap-12">
        <div
          className={
            !loading && !cartDetails?.items?.length
              ? "w-full  flex justify-center"
              : "hidden"
          }
        >
          <EmptyCart size="xl" />
        </div>

        <div
          className={
            !loading && cartDetails?.items?.length
              ? "block w-full xs:w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12"
              : "hidden"
          }
        >
          <ShoppingList />
        </div>
        <div
          className={
            !loading && cartDetails?.items?.length
              ? "block w-full xs:w-full sm:w-full md:w-full lg:w-4/12 xl:w-4/12"
              : "hidden"
          }
        >
          <PaymentSummery />
        </div>
      </div>
    </div>
  );
};
