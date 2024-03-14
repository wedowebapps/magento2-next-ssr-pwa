"use client";
import { FC } from "react";
import Lottie from "react-lottie";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface LoadingDotsProps {
  size?: Size;
}

export const LoadingDots: FC<LoadingDotsProps> = ({ size = "md" }) => {
  const animationData = require("./lottie-dots-loading.json");

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
