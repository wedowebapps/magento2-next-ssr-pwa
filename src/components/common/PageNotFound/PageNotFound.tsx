"use client";
import { FC } from "react";
import Lottie from "react-lottie";
import animationData from "@/lottiefiles/page-not-found.json";
import { useRouter } from "next/navigation";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface PageNotFoundProps {
  size?: Size;
}

export const PageNotFound: FC<PageNotFoundProps> = ({ size = "md" }) => {
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sizeObj = {
    xs: 50,
    sm: 150,
    md: 250,
    lg: 350,
    xl: 500,
  };

  const LoaderSize = sizeObj[size];

  return (
    <div className="pt-10 flex flex-col gap-2">
      <Lottie options={defaultOptions} height={LoaderSize} width={LoaderSize} />
      <div className="flex justify-center pb-10">
        <button
          onClick={() => router.push("/")}
          className="btn btn-outline rounded uppercase"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
};
