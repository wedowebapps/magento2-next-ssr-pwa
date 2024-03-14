"use client";
import { FC, useContext } from "react";
import {
  HotSalesProduct,
  NewArrivalsProduct,
  TopSalesProduct,
  Typography,
} from "@/components";
import { HomeContext } from "@/context";

export interface SalesProductProps {}

export const SalesProduct: FC<SalesProductProps> = () => {
  const { topSales, hotSales, newArrivals } = useContext(HomeContext);

  return (
    <section
      id="sellers"
      className="p-4 flex flex-col gap-12 container mx-auto"
    >
      <div className="flex flex-col gap-4">
        <Typography variant="h2" className="tracking-widest">
          Top Sales
        </Typography>
        <TopSalesProduct topSales={topSales} />
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="h2" className="tracking-widest">
          New Arrivals
        </Typography>
        <NewArrivalsProduct newArrivals={newArrivals} />
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="h2" className="tracking-widest">
          Hot Sales
        </Typography>
        <HotSalesProduct hotSales={hotSales} />
      </div>
    </section>
  );
};
