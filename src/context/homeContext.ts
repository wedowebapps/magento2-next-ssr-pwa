"use client";
import {
  HomeInitialState,
  HotSalesProduct,
  NewArrivalsSalesProduct,
  TopSalesProduct,
} from "@/types";
import { createContext } from "react";

interface HomeContextType {
  homeBanner: HomeInitialState;
  topSales: TopSalesProduct;
  newArrivals: NewArrivalsSalesProduct;
  hotSales: HotSalesProduct;
}

const contextData: HomeContextType = {
  homeBanner: {
    __typename: "",
    banner_image: "",
    description: "",
    sub_title: " ",
    title: "",
  },
  topSales: {
    items: [],
    page_info: { current_page: 1, page_size: 10, total_pages: 10 },
    total_count: 0,
  },
  newArrivals: {
    items: [],
    page_info: { current_page: 1, page_size: 10, total_pages: 10 },
    total_count: 0,
  },
  hotSales: {
    items: [],
    page_info: { current_page: 1, page_size: 10, total_pages: 10 },
    total_count: 0,
  },
  // Other properties in HomeContextType
};

export const HomeContext = createContext<HomeContextType>(contextData);
