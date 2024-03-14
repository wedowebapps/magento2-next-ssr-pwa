"use client";
import {
  ApolloQueryResult,
  OperationVariables,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { toast } from "react-toastify";
import { Mutations, Queries } from "@/utils/graphql";
import { FetchWishlist, Product, WishlistV2 } from "@/types";
import { useRouter } from "next/navigation";

export interface UseWishlistProps {}
type fetchWishlistParam = {
  currentPage: number;
  pageSize?: number | undefined;
};

export interface UseWishlistReturns {
  wishlist: WishlistV2 | undefined;
  wishlistLoading: boolean;
  addWishlistLoading: boolean;
  removeWishlistLoading: boolean;
  handleAddWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (wishlistId: string) => Promise<void>;
  fetchWishlist: (param: fetchWishlistParam) => Promise<void>;
  refetchWishList: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<FetchWishlist>>;
}

export const useWishlist = (): UseWishlistReturns => {
  const { ADD_PRODUCT_TO_WISHLIST, REMOVE_PRODUCT_FROM_WISHLIST } = Mutations;
  const { GET_CUSTOMER_WISHLIST } = Queries;
  const router = useRouter();

  const [
    getCustomerWishlist,
    { data: wishlistData, loading: wishlistLoading, refetch: refetchWishList },
  ] = useLazyQuery<FetchWishlist>(GET_CUSTOMER_WISHLIST);
  const [addProductsToWishlist, { loading: addWishlistLoading }] = useMutation(
    ADD_PRODUCT_TO_WISHLIST,
  );
  const [RemoveProductsFromWishlist, { loading: removeWishlistLoading }] =
    useMutation(REMOVE_PRODUCT_FROM_WISHLIST);

  const wishlist = wishlistData?.customer?.wishlist_v2;

  const handleAddWishlist = async (product: Product) => {
    const payload = {
      wishlistId: "0",
      wishlistItems: [
        {
          sku: product?.sku,
          quantity: 1,
        },
      ],
    };
    try {
      const response = await addProductsToWishlist({ variables: payload });
      if (response) {
        router.refresh();
        await refetchWishList();
        toast.success("Add to favorites");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  const removeFromWishlist = async (wishlistId: string) => {
    const payload = {
      wishlistId: "0",
      wishlistItemIds: [wishlistId],
    };

    try {
      const response = await RemoveProductsFromWishlist({
        variables: payload,
      });
      if (response) {
        await refetchWishList();
        toast.success("Item removed from wishlist");
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  const fetchWishlist = async ({
    currentPage,
    pageSize = 10,
  }: fetchWishlistParam) => {
    await getCustomerWishlist({
      variables: {
        currentPage,
        pageSize,
        id: "0",
      },
    });
  };

  return {
    wishlist,
    wishlistLoading,
    addWishlistLoading,
    removeWishlistLoading,
    handleAddWishlist,
    removeFromWishlist,
    fetchWishlist,
    refetchWishList,
  };
};
