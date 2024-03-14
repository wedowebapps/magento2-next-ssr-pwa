import { HomeInitialState, TopSalesProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface HomeState {
  homeBanner: HomeInitialState;
  topSales: TopSalesProduct;
}

const initialState: HomeState = {
  homeBanner: {
    __typename: "",
    title: "",
    banner_image: "",
    description: "",
    sub_title: "",
  },
  topSales: {
    items: [],
    page_info: {
      current_page: 1,
      page_size: 20,
      total_pages: 10,
    },
    total_count: 0,
  },
};

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setHomePage: (state, action) => {
      return {
        ...state,
        homeBanner: {
          ...action.payload,
        },
      };
    },
    setTopSales: (state, action) => {
      return {
        ...state,
        topSales: { ...action.payload },
      };
    },
  },
});

export const { setHomePage, setTopSales } = homePageSlice.actions;
export default homePageSlice.reducer;
