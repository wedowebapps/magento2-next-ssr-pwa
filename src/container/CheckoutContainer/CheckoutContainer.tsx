"use client";
import {
  CheckoutUserInformation,
  EmptyCart,
  OrderSummery,
  Typography,
} from "@/components";
import { useLazyQuery } from "@apollo/client";
import { FC, Fragment, useEffect, useState } from "react";
import { CheckoutContext, useCartContext } from "@/context";
import { Queries } from "@/utils/graphql";

export interface CheckoutContainerProps {}

export const CheckoutContainer: FC<CheckoutContainerProps> = () => {
  const { CHECK_EMAIL_AVAILABLE, GET_EXTRA_PM_DETAILS } = Queries;
  const [checkIsEmailAvailable] = useLazyQuery(CHECK_EMAIL_AVAILABLE);
  const [] = useLazyQuery(GET_EXTRA_PM_DETAILS);
  const { cartDetails, cartId, cartLoading, refetchCartDetails } =
    useCartContext();

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);

  const handleVerifyEmailAvailable = async (email: string) => {
    if (email) {
      const response = await checkIsEmailAvailable({
        variables: {
          email,
        },
      });

      if (response) {
        setIsEmailAvailable(
          response?.data?.isEmailAvailable?.is_email_available,
        );
      }

      return response;
    }
  };

  useEffect(() => {
    (async () => {
      await handleVerifyEmailAvailable(cartDetails?.email);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetails?.email]);

  return (
    <Fragment>
      <div className="pt-4 pb-12 px-4 container mx-auto flex flex-col gap-4">
        <CheckoutContext.Provider
          value={{
            cartDetails,
            cartId,
            isEmailAvailable,
            cartLoading,
            refetchCartDetails,
            handleVerifyEmailAvailable,
          }}
        >
          <div>
            <Typography variant="h1">Checkout</Typography>
          </div>
          <div
            className={
              !cartLoading && !cartDetails?.items?.length
                ? "w-full  flex justify-center"
                : "hidden"
            }
          >
            <EmptyCart size="xl" />
          </div>
          <div
            className={
              !cartLoading && cartDetails?.items?.length
                ? "flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row  gap-12"
                : "hidden"
            }
          >
            <div className="w-full xs:w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12">
              <div className="card bg-base-100 shadow-[0_0px_40px_-22px_rgba(0,0,0,0.3)]">
                <div className="card-body">
                  <div className="divider"></div>
                  <div className="">
                    <CheckoutUserInformation />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xs:w-full sm:w-full md:w-full lg:w-4/12 xl:w-4/12">
              <OrderSummery />
            </div>
          </div>
        </CheckoutContext.Provider>
      </div>
    </Fragment>
  );
};
