"use client";
import {
  ProductCarousel,
  ProductDetails,
  RelatedProducts,
  Typography,
} from "@/components";
import { ProductDetailsContext } from "@/context";
import { ProductDetailsType, ProductVariants } from "@/types";

import { FC, useEffect, useState } from "react";

export interface ProductDetailsContainerProps {
  ssrData: {
    productDetails: ProductDetailsType;
  };
}

export type ConfigurationState = {
  size: string;
  color: string;
};

export const ProductDetailsContainer: FC<ProductDetailsContainerProps> = ({
  ssrData,
}) => {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    color: "",
    size: "",
  });
  const [productVariant, setProductVariant] = useState<ProductVariants>();

  useEffect(() => {
    const currentVariant = ssrData?.productDetails?.items[0]?.variants?.find(
      (variant) => {
        const colorAttribute = variant.attributes.find(
          (attr) => attr.code === "color",
        );
        const sizeAttribute = variant.attributes.find(
          (attr) => attr.code === "size",
        );

        return (
          colorAttribute &&
          sizeAttribute &&
          colorAttribute.uid === configuration?.color &&
          sizeAttribute.uid === configuration?.size
        );
      },
    );
    if (currentVariant) {
      setProductVariant(currentVariant);
    } else {
      setProductVariant({
        product: ssrData?.productDetails?.items[0],
        attributes: [],
      });
    }
  }, [configuration, ssrData?.productDetails?.items]);

  return (
    <ProductDetailsContext.Provider
      value={{
        productsDetails: ssrData.productDetails,
        configuration,
        productVariant,
        setProductVariant,
        setConfiguration,
      }}
    >
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex flex-col gap-12">
          <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-12">
            <div className="w-full">
              <ProductCarousel />
            </div>
            <div className="flex flex-col">
              <ProductDetails />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Typography variant="h2">Related Products</Typography>
            <RelatedProducts />
          </div>
        </div>
      </div>
    </ProductDetailsContext.Provider>
  );
};
