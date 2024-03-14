"use client";
import {
  FilterSidebar,
  NotFound,
  Pagination,
  ProductCard,
  ProductSorting,
  Typography,
} from "@/components";
import { ProductList } from "@/types";

import { FC, useEffect, useState } from "react";

export interface ProductListContainerProps {
  ssrData: {
    productSidebarFilter: any;
    productsList: ProductList;
  };
  searchParams: any;
  handleAddFilter: (value: any) => void;
  handleRemoveFilter: (value?: any) => void;
}

export const ProductListContainer: FC<ProductListContainerProps> = ({
  ssrData,
  handleAddFilter,
  handleRemoveFilter,
  searchParams,
}) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  const handlePagination = (page: number) => {
    if (page) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      handleAddFilter({ ...selectedCategory });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    handleAddFilter({ page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (ssrData.productsList.page_info.current_page) {
      setCurrentPage(ssrData.productsList.page_info.current_page);
    }
  }, [ssrData.productsList.page_info.current_page]);

  return (
    <div className="container mx-auto flex gap-4 lg:gap-6 xl:gap-12">
      <div className="py-4 top-24 sticky">
        {ssrData?.productSidebarFilter && (
          <FilterSidebar
            handleChange={handleChange}
            productSidebarFilter={ssrData.productSidebarFilter.products}
            searchParams={searchParams}
            handleRemoveFilter={handleRemoveFilter}
          />
        )}
      </div>

      <div className="flex justify-center w-full pt-4">
        <div className="flex flex-col py-4 gap-8 w-full">
          <div className="flex justify-between flex-wrap">
            <Typography variant="h1">Product List</Typography>
            <ProductSorting handleAddFilter={handleAddFilter} />
          </div>
          {!ssrData?.productsList?.items?.length && (
            <div className="flex justify-center h-full items-center">
              <NotFound size="xl" />
            </div>
          )}

          {!!ssrData?.productsList?.items?.length && (
            <div className="grid gap-4 lg:gap-6 xl:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ssrData?.productsList?.items?.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  isShowFavorites={true}
                />
              ))}
            </div>
          )}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              perPage={ssrData?.productsList?.page_info?.page_size || 1}
              totalPage={ssrData?.productsList?.page_info?.total_pages ?? 10}
              handlePagination={handlePagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
