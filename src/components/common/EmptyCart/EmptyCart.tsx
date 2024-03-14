"use client";
import { FC } from "react";
import Lottie from "react-lottie";
import animationData from "@/lottiefiles/empty-cart.json";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface EmptyCartProps {
  size?: Size;
}

export const EmptyCart: FC<EmptyCartProps> = ({ size = "md" }) => {
  const router = useRouter();
  const { setIsMiniCartOpen } = useAppContext();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sizeObj = {
    xs: 40,
    sm: 80,
    md: 120,
    lg: 160,
    xl: 200,
  };

  const LoaderSize = sizeObj[size];

  return (
    <div className="flex flex-col gap-4">
      <Lottie options={defaultOptions} height={LoaderSize} width={LoaderSize} />
      <span>No Item found in your cart.</span>
      <button
        className="btn btn-outline rounded uppercase"
        onClick={() => {
          setIsMiniCartOpen(false);
          router.push("/category");
        }}
      >
        Shop Now
      </button>
    </div>
  );
};
