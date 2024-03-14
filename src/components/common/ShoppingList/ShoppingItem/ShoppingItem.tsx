"use client";
import { LoadingDots, ProductCounter, Typography } from "@/components";
import { CartItemType } from "@/types";
import { currencyFormatter } from "@/utils/helper";
import Image from "next/image";
import { FC, Fragment, useEffect, useState } from "react";
import { BrowserPersistence, localStorageKeys } from "@/utils";
import { useCartItem, useDebouncedValue } from "@/hooks";

export interface ShoppingItemProps {
  cartItem: CartItemType;
}

export const ShoppingItem: FC<ShoppingItemProps> = ({ cartItem }) => {
  const [productQty, setProductQty] = useState<number>(cartItem?.quantity);
  const [debouncedProductQty] = useDebouncedValue(productQty, 200);
  const { handleProductQty, handleRemoveFromCart, productRemoveLoading } =
    useCartItem();

  const storage = new BrowserPersistence();
  const cartId = storage.getItem(localStorageKeys.CART_ID);

  useEffect(() => {
    if (cartItem?.quantity) {
      setProductQty(cartItem?.quantity);
    }
  }, [cartItem?.quantity]);

  useEffect(() => {
    (async () => {
      if (debouncedProductQty) {
        await handleProductQty({
          input: {
            cart_id: cartId,
            cart_items: [
              {
                cart_item_uid: cartItem?.uid,
                quantity: debouncedProductQty,
              },
            ],
          },
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedProductQty]);

  return (
    <Fragment>
      <div className={productRemoveLoading ? "block" : "hidden"}>
        <LoadingDots />
      </div>
      <div
        className={
          !productRemoveLoading
            ? "grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            : "hidden"
        }
      >
        <div className="flex justify-center col-span-2 xl:col-span-1">
          <figure className="relative min-w-60 max-w-xs transition-all duration-300 cursor-pointer filter">
            <Image
              className="rounded-lg"
              height={1000}
              width={1000}
              src={cartItem?.product?.thumbnail?.url}
              alt={cartItem?.product?.thumbnail?.label ?? "Product-image"}
            />
          </figure>
        </div>
        <div className="flex flex-col justify-between gap-4 col-span-2 w-full">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-col gap-2">
              <Typography variant="h5">{cartItem?.product.name}</Typography>
              {cartItem?.configurable_options?.map((config, index) => (
                <Typography variant="p" key={index}>
                  {`${config.option_label} : ${config.value_label}`}
                </Typography>
              ))}
            </div>
            <div className="flex flex-row flex-wrap gap-2 xs:flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col">
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  handleRemoveFromCart({
                    cart_id: cartId,
                    cart_item_uid: cartItem.uid,
                  })
                }
              >
                Remove cart
              </button>
              <button className="btn btn-outline btn-sm">
                Move To Wish List
              </button>
            </div>
          </div>
          <div className="flex  justify-between flex-wrap items-center">
            <ProductCounter
              productQty={productQty}
              setProductQty={setProductQty}
            />
            <div className="text-right">
              <span className="text-xl font-semibold text-right">
                {currencyFormatter({
                  currency: cartItem?.prices?.price?.currency,
                  number: cartItem?.prices?.price?.value ?? 0,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
