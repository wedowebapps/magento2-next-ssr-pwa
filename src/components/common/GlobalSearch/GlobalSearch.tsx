"use client";
import { FC, Fragment, useEffect, useState } from "react";
import { Drawer, LoadingDots, NotFound } from "..";
import { useAppContext } from "@/context";
import { Search } from "@/components";
import { useLazyQuery } from "@apollo/client";
import { Product, ProductTopSearch } from "@/types";
import { useDebouncedValue } from "@/hooks";
import Image from "next/image";
import { currencyFormatter } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { Queries } from "@/utils/graphql";

export interface GlobalSearchProps {}
export interface SearchItemProps {
  product: Product;
}

export const SearchItem: FC<SearchItemProps> = ({ product }) => {
  const router = useRouter();
  const { setIsGlobalSearchOpen } = useAppContext();

  return (
    <div
      className="flex gap-4 border-b py-2 hover:bg-gray-300 px-2 cursor-pointer rounded"
      role="button"
      onClick={() => {
        setIsGlobalSearchOpen(false);
        router.push(`/products/${product?.url_key || ""}`);
      }}
    >
      <Image
        src={product?.thumbnail?.url ?? ""}
        alt={product?.thumbnail?.label ?? "Product-Image"}
        width={1000}
        height={1000}
        className="h-16 w-16"
      />
      <div className="flex flex-col gap-2">
        <span>{product?.name}</span>
        <span>
          {currencyFormatter({
            number: product?.price_range?.minimum_price?.final_price?.value,
            currency:
              product?.price_range?.minimum_price?.final_price?.currency,
          })}
        </span>
      </div>
    </div>
  );
};

export const GlobalSearch: FC<GlobalSearchProps> = () => {
  const { PRODUCT_TOP_SEARCH } = Queries;
  const { isGlobalSearchOpen, setIsGlobalSearchOpen } = useAppContext();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 200);

  const [searchProduct, { data: matchProduct, loading: matchProductLoading }] =
    useLazyQuery<{
      productTopSearch: ProductTopSearch;
    }>(PRODUCT_TOP_SEARCH);

  useEffect(() => {
    (async () => {
      await searchProduct({
        variables: {
          search: debouncedSearchValue,
        },
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const handleSearch = (e: any) => {
    const str: string = e.target.value;
    setSearchValue(e.target.value);
  };

  return (
    <Fragment>
      <button
        className="btn btn-ghost btn-circle text-white"
        onClick={() => setIsGlobalSearchOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <Drawer
        isOpen={isGlobalSearchOpen}
        setIsOpen={() => setIsGlobalSearchOpen((prev) => !prev)}
        title={
          <div className="flex justify-between items-center">
            <span className="p-4 font-bold text-lg">Search Products</span>
            <button
              className="p-4 font-bold btn btn-ghost"
              onClick={() => setIsGlobalSearchOpen(false)}
            >
              Close
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 p-4">
          <Search
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            name="search"
          />
          <div className="flex flex-col border p-2 rounded-md overflow-y-scroll h-[calc(100vh-147px)] no-scrollbar">
            <Fragment>
              <div
                className={
                  matchProductLoading
                    ? "flex justify-center items-center h-full"
                    : "hidden"
                }
              >
                <LoadingDots />
              </div>
              <div
                className={
                  matchProductLoading ||
                  matchProduct?.productTopSearch?.items?.length
                    ? "hidden"
                    : "flex justify-center items-center h-full"
                }
              >
                <NotFound />
              </div>
              {matchProduct?.productTopSearch?.items?.map((product, index) => (
                <SearchItem key={index} product={product} />
              ))}
            </Fragment>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};
