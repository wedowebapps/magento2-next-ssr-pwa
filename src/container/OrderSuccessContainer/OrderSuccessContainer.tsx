"use client";
import { FC, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "@/lottiefiles/success-animation.json";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context";
import { cookiePersist } from "@/utils/helper";
import { cookieStorageKey } from "@/utils";

export interface OrderSuccessContainerProps {}

export const OrderSuccessContainer: FC<OrderSuccessContainerProps> = () => {
  const router = useRouter();
  const { createCart } = useCartContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    (async () => {
      await createCart();
      cookiePersist.setItem(cookieStorageKey.IS_PLACE_ORDER, false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Lottie options={defaultOptions} height={250} width={250} />
        <span className="text-5xl font-semibold">
          Thank you for your purchase!
        </span>
        <span className="text-xl text-gray-500">
          You should received an order confirmation email shortly.
        </span>
      </div>
      <a href="/" className="btn bg-primary-500 text-white rounded-full">
        Bake to Home
      </a>
    </div>
  );
};
