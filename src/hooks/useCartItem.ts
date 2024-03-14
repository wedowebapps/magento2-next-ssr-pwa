import { useMutation } from "@apollo/client";
import { useCartContext } from "@/context";
import { toast } from "react-toastify";
import { Mutations } from "@/utils/graphql";

export interface UseCartItemProps {}

export interface UseCartItemReturns {
  productRemoveLoading: boolean;
  productUpdateLoading: boolean;
  handleRemoveFromCart: (payload: any) => any;
  handleProductQty: (payload: any) => any;
}

export const useCartItem = (): UseCartItemReturns => {
  const { CART_PRODUCT_REMOVE, CART_PRODUCT_UPDATE } = Mutations;

  const [cartProductRemove, { loading: productRemoveLoading }] =
    useMutation(CART_PRODUCT_REMOVE);
  const [cartProductUpdate, { loading: productUpdateLoading }] =
    useMutation(CART_PRODUCT_UPDATE);

  const { refetchCartDetails } = useCartContext();

  const handleRemoveFromCart = async (payload: {
    cart_id: string;
    cart_item_uid: string;
  }) => {
    const { cart_id, cart_item_uid } = payload;
    try {
      const response = await cartProductRemove({
        variables: {
          input: {
            cart_id,
            cart_item_uid,
          },
        },
      });

      if (response) {
        await refetchCartDetails();
      }
    } catch (error: any) {
      toast.error("Oops! Something went wrong please try again.");
    }
  };

  const handleProductQty = async (payload: any) => {
    try {
      await cartProductUpdate({ variables: payload });
    } catch (error: any) {
      toast.error("Requested quantity not available");
    } finally {
      await refetchCartDetails();
    }
  };

  return {
    productRemoveLoading,
    productUpdateLoading,
    handleRemoveFromCart,
    handleProductQty,
  };
};
