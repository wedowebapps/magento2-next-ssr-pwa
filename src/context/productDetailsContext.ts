"use client";
import { ConfigurationState } from "@/container";
import { ProductDetailsType, ProductVariants } from "@/types";
import { Dispatch, SetStateAction, createContext } from "react";

interface ProductDetailsContextType {
  productsDetails: ProductDetailsType;
  configuration: ConfigurationState;
  setConfiguration: Dispatch<SetStateAction<ConfigurationState>>;
  productVariant: ProductVariants | undefined;
  setProductVariant: Dispatch<SetStateAction<ProductVariants | undefined>>;
}

const contextData: ProductDetailsContextType = {
  productsDetails: {
    __typename: "",
    items: [],
  },
  configuration: {
    color: "",
    size: "",
  },
  productVariant: undefined,
  setConfiguration: () => null,
  setProductVariant: () => null,

  // Other properties in SidebarContextType
};

export const ProductDetailsContext =
  createContext<ProductDetailsContextType>(contextData);
