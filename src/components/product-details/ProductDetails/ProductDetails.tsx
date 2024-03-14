"use client";
import {
  ConfigurationOption,
  ProductCounter,
  RatingStart,
  Typography,
} from "@/components";
import { ProductDetailsContext, useAppContext } from "@/context";
import { useAddToCart } from "@/hooks";
import { currencyFormatter } from "@/utils/helper";
import { FC, Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";

export interface ProductDetailsProps {}

export type ConfigureParam = {
  key: string;
  value: string | number;
};

export const ProductDetails: FC<ProductDetailsProps> = () => {
  const [productQty, setProductQty] = useState<number>(1);
  const { handleAddToCart } = useAddToCart();
  const { setIsMiniCartOpen } = useAppContext();
  const { productsDetails, configuration, productVariant, setConfiguration } =
    useContext(ProductDetailsContext);

  const data = productsDetails?.items[0];

  const handleConfiguration = (config: {
    key: string;
    value: string | number;
  }) => {
    setConfiguration((prev) => ({ ...prev, [config.key]: config.value }));
  };

  const handleAddCartClick = async () => {
    const response = await handleAddToCart({
      cartItems: [
        {
          quantity: productQty,
          sku: data?.sku,
          selected_options: [configuration.color, configuration.size],
        },
      ],
    });
    if (response) {
      if (response?.data?.addProductsToCart?.user_errors.length) {
        toast.error(response?.data?.addProductsToCart?.user_errors[0]?.message);
      } else {
        setProductQty(1);
        setIsMiniCartOpen(true);
        toast.success("Product added successfully.");
      }
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <Typography variant="h3">{data?.name}</Typography>
        <RatingStart
          length={5}
          className="h-8 w-8"
          rating={data?.rating_summary || 0}
        />
        <Typography variant="h3">
          {currencyFormatter({
            currency:
              productVariant?.product?.price_range?.minimum_price?.final_price
                ?.currency,
            number:
              productVariant?.product?.price_range?.minimum_price?.final_price
                ?.value ?? 0,
          })}
        </Typography>
      </div>
      <div className="divider"></div>
      <div className="flex gap-12 flex-wrap">
        {data?.configurable_options?.map((configureOption, index) => (
          <div className="flex flex-col gap-4" key={index}>
            <ConfigurationOption
              configureOption={configureOption}
              handleConfiguration={handleConfiguration}
              key={index}
            />
          </div>
        ))}
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-2">
        <span>
          <b>Last 1 left</b> - make it yours!
        </span>
        <div className="flex gap-4">
          <ProductCounter
            productQty={productQty}
            setProductQty={setProductQty}
          />
          <button
            onClick={handleAddCartClick}
            className="btn bg-primary-500 text-white hover:text-primary-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Fragment>
  );
};
