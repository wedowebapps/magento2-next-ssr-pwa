"use client";
import { ProductListContainer } from "@/container";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { usePathname, useRouter } from "next/navigation";
import { convertObjectToQuerystring } from "@/utils/helper";
import { Queries } from "@/utils/graphql";

export default function CategoryPage({ searchParams }: any) {
  const { PRODUCT_SIDEBAR_FILTER, PRODUCTS_LIST } = Queries;
  const router = useRouter();
  const pathname = usePathname();
  const priceArr = searchParams?.price?.split("_");
  const price =
    (Array.isArray(priceArr) && {
      from: priceArr[0],
      to: priceArr[1],
    }) ||
    {};

  const { data: productSidebarFilter } = useSuspenseQuery<any>(
    PRODUCT_SIDEBAR_FILTER,
    {
      variables: {
        categoryIdFilter: { eq: searchParams?.uid },
      },
    },
  );
  const { data: productsList } = useSuspenseQuery<any>(PRODUCTS_LIST, {
    variables: {
      sort: { [searchParams.sortBy]: searchParams.orderBy },
      currentPage: 1,
      pageSize: 20,
      filters: {
        category_uid: {
          eq: searchParams?.uid,
        },
        price,
        color: { eq: searchParams.color },
      },
    },
  });

  const handleAddFilter = (value: any) => {
    const query = convertObjectToQuerystring({ ...searchParams, ...value });
    router.push(`${pathname}?${query}`, { scroll: true });
  };

  const handleRemoveFilter = (value?: any) => {
    if (value) {
      delete searchParams[value];
      const query = convertObjectToQuerystring({ ...searchParams });
      router.replace(`${pathname}?${query}`, { scroll: true });
    } else {
      router.replace(`${pathname}`, { scroll: true });
    }
  };

  return (
    <ProductListContainer
      ssrData={{ productSidebarFilter, productsList: productsList?.products }}
      handleAddFilter={handleAddFilter}
      handleRemoveFilter={handleRemoveFilter}
      searchParams={searchParams}
    />
  );
}
