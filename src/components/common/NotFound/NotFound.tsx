"use client";
import { FC } from "react";
import Lottie from "react-lottie";
import animationData from "@/lottiefiles/not-found.json";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface NotFoundProps {
  size?: Size;
}

export const NotFound: FC<NotFoundProps> = ({ size = "md" }) => {
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
      <span className="font-semibold">
        {"Product missing! Check out similar items below."}
      </span>
    </div>
  );
};
