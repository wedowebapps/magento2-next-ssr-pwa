import { ProductSidebarFilter } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  productSidebarFilter: ProductSidebarFilter;
}

const initialState: ProductState = {
  productSidebarFilter: {
    __typename: "",
    aggregations: [],
  },
};

const ProductPageSlice = createSlice({
  name: "product-page",
  initialState,
  reducers: {
    setSidebarFilter: (state, action) => {
      return {
        ...state,
        productSidebarFilter: {
          ...action.payload,
        },
      };
    },
  },
});

export const { setSidebarFilter } = ProductPageSlice.actions;
export default ProductPageSlice.reducer;
