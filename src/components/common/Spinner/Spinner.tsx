"use client";
import { FC } from "react";
import Lottie from "react-lottie";
import animationData from "@/lottiefiles/spinner-animation.json";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  size?: Size;
}

export const Spinner: FC<SpinnerProps> = ({ size = "md" }) => {
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
    <Lottie options={defaultOptions} height={LoaderSize} width={LoaderSize} />
  );
};
