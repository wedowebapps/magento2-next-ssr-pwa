import { CommonFetchType, PageInfo, Product } from "@/types";

export interface HomeInitialState extends CommonFetchType {
  sub_title: string;
  description: string;
  title: string;
  banner_image: string;
}

export interface TopSalesProduct {
  items: Product[];
  total_count: number;
  page_info: PageInfo;
}
export interface NewArrivalsSalesProduct {
  items: Product[];
  total_count: number;
  page_info: PageInfo;
}
export interface HotSalesProduct {
  items: Product[];
  total_count: number;
  page_info: PageInfo;
}

export interface Menu {
  url: string;
  title: string;
}

export interface HeaderAPIResponse {
  getHeaderContent: Menu[];
}
export interface FooterAPIResponse {
  getFooterContent: Menu[];
}
