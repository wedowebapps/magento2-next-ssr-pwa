import { useMutation } from "@apollo/client";
import { BrowserPersistence, localStorageKeys } from "@/utils";
import { toast } from "react-toastify";
import { Mutations } from "@/utils/graphql";

export interface UseAddToCartProps {}

export interface UseAddToCartReturns {
  handleAddToCart: (variables: any) => any;
}

export const useAddToCart = (): UseAddToCartReturns => {
  const { ADD_PRODUCT_TO_CART } = Mutations;
  const storage = new BrowserPersistence();
  const cartId = storage.getItem(localStorageKeys.CART_ID);
  const [addToCart] = useMutation(ADD_PRODUCT_TO_CART);

  const handleAddToCart = async (params: any) => {
    try {
      const response = await addToCart({ variables: { cartId, ...params } });
      return response;
    } catch (error: any) {
      toast.error("Oops! Something went wrong please try again.");
    }
  };

  return {
    handleAddToCart,
  };
};
