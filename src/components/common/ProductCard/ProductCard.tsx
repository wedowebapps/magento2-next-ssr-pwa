"use client";
import { DeleteFavorite, DeleteIcon, FavoriteToggle } from "@/components";
import { FetchWishlist, Product } from "@/types";
import { Queries } from "@/utils/graphql";
import { currencyFormatter } from "@/utils/helper";
import { useLazyQuery } from "@apollo/client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

export interface ProductCardProps {
  product?: Product;
  isShowFavorites?: boolean;
  isShowDeleteFavorites?: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  isShowDeleteFavorites = false,
  isShowFavorites = false,
}) => {
  const router = useRouter();
  const { GET_CUSTOMER_WISHLIST } = Queries;
  const [
    getCustomerWishlist,
    { data: wishlistData, loading: wishlistLoading },
  ] = useLazyQuery<FetchWishlist>(GET_CUSTOMER_WISHLIST);

  const wishlist = wishlistData?.customer?.wishlist_v2;

  const currentWishlistItem = useMemo(
    () =>
      wishlist?.items_v2?.items.find((x) => x.product?.sku === product?.sku),
    [product?.sku, wishlist?.items_v2?.items],
  );

  useEffect(() => {
    (async () => {
      await getCustomerWishlist();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {isShowFavorites && (
        <FavoriteToggle
          product={product!}
          currentWishlistItem={currentWishlistItem}
          loading={wishlistLoading}
        />
      )}
      {isShowDeleteFavorites && (
        <DeleteFavorite currentWishlistItem={currentWishlistItem} />
      )}

      <div className={clsx("card card-compact bg-base-100 shadow-xl", [])}>
        <figure
          role="button"
          onClick={() => router.push(`/products/${product?.url_key || ""}`)}
        >
          <Image
            className="hover:scale-110 duration-500 h-72 object-contain"
            width={1000}
            height={1000}
            src={product?.small_image?.url ?? ""}
            alt={product?.name ?? "shoes"}
          />
        </figure>
        <div className="card-body">
          <div className="flex flex-col gap-2">
            <span
              role="button"
              onClick={() => router.push(`/products/${product?.url_key || ""}`)}
              className="text-primary-500 font-medium text-lg line-clamp-1"
            >
              {product?.name ?? "shoes"}
            </span>

            <div className="flex justify-between items-center">
              <span
                role="button"
                onClick={() =>
                  router.push(`/products/${product?.url_key || ""}`)
                }
                className="text-primary-500 font-medium"
              >
                {currencyFormatter({
                  currency:
                    product?.price_range?.minimum_price?.final_price?.currency!,
                  number:
                    product?.price_range?.minimum_price?.final_price?.value! ??
                    0,
                })}
              </span>
              <button
                className=""
                onClick={() =>
                  router.push(`/products/${product?.url_key || ""}`)
                }
              >
                <span className="text-primary-500 font-semibold">View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
