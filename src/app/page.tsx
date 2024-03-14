"use client";
import { HomeContainer } from "@/container";
import { Queries } from "@/utils/graphql";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export default function Home() {
  const {
    HOME_BANNER_QUERY,
    TOP_SALES_QUERY,
    NEW_ARRIVALS_QUERY,
    HOST_SALES_QUERY,
  } = Queries;

  const { data: homeBanner } = useSuspenseQuery<any>(HOME_BANNER_QUERY);
  const { data: topSales } = useSuspenseQuery<any>(TOP_SALES_QUERY);
  const { data: newArrivals } = useSuspenseQuery<any>(NEW_ARRIVALS_QUERY);
  const { data: hotSales } = useSuspenseQuery<any>(HOST_SALES_QUERY);

  return (
    <HomeContainer ssrData={{ homeBanner, topSales, newArrivals, hotSales }} />
  );
}
