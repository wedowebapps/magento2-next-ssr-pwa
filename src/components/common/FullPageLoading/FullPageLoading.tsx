import { FC } from "react";
import { Spinner } from "@/components";

export interface FullPageLoadingProps {}

export const FullPageLoading: FC<FullPageLoadingProps> = () => {
  return (
    <div className="w-full h-screen">
      <div className="z-[1000] bg-white w-full h-full flex justify-center items-center flex-col gap-2">
        <Spinner size="xl" />
        <span className="text-wrap max-w-2xl text-center font-semibold">
          {"Exciting things coming your way! Thanks for waiting. 🌟😊"}
        </span>
      </div>
    </div>
  );
};
