"use client";
import { NotFound, Pagination, ProductCard, Typography } from "@/components";
import { useWishlist } from "@/hooks";
import { FC, useEffect, useState } from "react";

export interface WishListContainerProps {}

export const WishListContainer: FC<WishListContainerProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { fetchWishlist, wishlist } = useWishlist();

  const handlePagination = (page: number) => {
    if (page) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchWishlist({
        currentPage,
        pageSize: 10,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex justify-center w-full pt-4 container mx-auto px-2">
      <div className="flex flex-col py-4 gap-8 w-full">
        <div className="flex justify-between flex-wrap">
          <Typography variant="h1">Wish List</Typography>
        </div>
        <div
          className={
            wishlist?.items_v2?.items?.length
              ? "hidden"
              : "flex justify-center h-full items-center"
          }
        >
          <NotFound size="xl" />
        </div>
        <div className="grid gap-4 grid-cols-1 lg:gap-6 xl:gap-12 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!!wishlist?.items_v2?.items?.length &&
            wishlist?.items_v2?.items?.map((product, index) => (
              <ProductCard
                isShowDeleteFavorites={true}
                key={index}
                product={product?.product}
              />
            ))}
        </div>
        {!!wishlist?.items_v2?.items?.length && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              perPage={wishlist?.items_v2?.page_info?.page_size || 1}
              totalPage={wishlist?.items_v2?.page_info?.total_pages ?? 10}
              handlePagination={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};
