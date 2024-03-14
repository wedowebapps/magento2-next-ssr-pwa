"use client";
import { HomeBanner, SalesProduct, TrendingProducts } from "@/components";
import { HomeContext } from "@/context";

import { FC } from "react";

export interface HomeContainerProps {
  ssrData: {
    homeBanner: any;
    topSales: any;
    newArrivals: any;
    hotSales: any;
  };
}

export const HomeContainer: FC<HomeContainerProps> = ({ ssrData }) => {
  const { homeBanner, topSales, newArrivals, hotSales } = ssrData;

  return (
    <HomeContext.Provider
      value={{
        homeBanner: homeBanner.getHomePageContent,
        topSales: topSales.getBestsellerProducts,
        newArrivals: newArrivals.getNewArrivalsProducts,
        hotSales: hotSales.getHotSaleProducts,
      }}
    >
      <HomeBanner />
      {/* <Collections /> */}
      <SalesProduct />
      <TrendingProducts />
    </HomeContext.Provider>
  );
};
