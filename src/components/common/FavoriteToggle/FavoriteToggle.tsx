"use client";
import { HeartIcon } from "@/components";
import { useAppContext } from "@/context";
import { useWishlist } from "@/hooks";
import { Product, WishlistItemV2 } from "@/types";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

export interface FavoriteToggleProps {
  product: Product;
  currentWishlistItem: WishlistItemV2 | undefined;
  loading: boolean;
}

export const FavoriteToggle: FC<FavoriteToggleProps> = ({
  product,
  currentWishlistItem,
  loading,
}) => {
  const {
    handleAddWishlist,
    removeFromWishlist,
    addWishlistLoading,
    removeWishlistLoading,
  } = useWishlist();
  const [selected, setSelected] = useState(false);
  const { authToken, setIsAccountDrawerOpen } = useAppContext();

  const handleToggleItem = async (currentWishlistItem: WishlistItemV2) => {
    if (authToken) {
      if (!!currentWishlistItem) {
        await removeFromWishlist(currentWishlistItem?.id);
        setSelected(false);
      } else {
        await handleAddWishlist(product);
        setSelected(true);
      }
    } else {
      setIsAccountDrawerOpen(true);
    }
  };

  useEffect(() => {
    setSelected(!!currentWishlistItem);
  }, [currentWishlistItem]);

  const isLoading = loading || addWishlistLoading || removeWishlistLoading;

  return (
    <div
      className={clsx("absolute top-4 right-4 z-10 cursor-pointer", [
        { "text-primary-500": selected },
        { "text-white": !selected },
      ])}
      role="button"
      onClick={() => {
        handleToggleItem(currentWishlistItem!);
      }}
    >
      <div
        className={isLoading ? "block loading text-primary-500" : "hidden"}
      ></div>
      <HeartIcon
        height={28}
        width={28}
        className={!isLoading ? "block" : "hidden"}
        stroke="#000"
      />
    </div>
  );
};
