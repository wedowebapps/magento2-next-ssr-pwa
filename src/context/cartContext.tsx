"use client";

import { CartDetailsType } from "@/types";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { FC, ReactNode, createContext, useContext, useEffect } from "react";
import { BrowserPersistence, localStorageKeys } from "@/utils";
import { FetchResult, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Mutations, Queries } from "@/utils/graphql";

interface CartContextType {
  cartDetails: CartDetailsType;
  cartLoading: boolean;
  cartId: string;
  refetchCartDetails: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
  createCart: () => Promise<void>;
  createCartAfterSignIn: (
    token: string,
  ) => Promise<FetchResult<any> | undefined>;
}

const contextData: CartContextType = {
  cartDetails: {
    __typename: "",
    applied_coupons: [],
    id: "",
    items: [],
    total_quantity: 0,
    billing_address: {
      firstname: "",
      lastname: "",
      company: "",
      street: [],
      city: "",
      region: {
        code: "",
        label: "",
        region_id: 0,
        __typename: "",
      },
      postcode: "",
      country: {
        code: "",
        label: "",
      },
      telephone: "",
      __typename: "",
    },
    email: "",
    prices: {
      applied_taxes: [],
      discount: {
        amount: {
          currency: "",
          value: 0,
        },
        label: [],
      },
      estimatedShipping: undefined,
      subtotal_excluding_tax: undefined,
      subtotal_including_tax: undefined,
      subtotal_with_discount_excluding_tax: undefined,
      grand_total: undefined,
    },
    selected_payment_method: {
      code: "",
    },
    shipping_addresses: [],
  },
  cartLoading: false,
  cartId: "",
  refetchCartDetails: () =>
    Promise.resolve(null as unknown as ApolloQueryResult<any>),
  createCart: () => Promise.resolve(),
  createCartAfterSignIn: () =>
    Promise.resolve(null as unknown as FetchResult<any>),

  // Other properties in SidebarContextType
};

export interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>(contextData);

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const storage = new BrowserPersistence();
  const cartId = storage.getItem(localStorageKeys.CART_ID);
  const { CART_DETAILS } = Queries;
  const { CREATE_CART_MUTATION, CREATE_CART_AFTER_SIGNIN } = Mutations;

  const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
  const [fetchCartIdAfterSignIn] = useMutation(CREATE_CART_AFTER_SIGNIN);

  const {
    data: cartDetailsData,
    loading: cartLoading,
    refetch: refetchCartDetails,
  } = useQuery(CART_DETAILS, {
    variables: {
      cartId,
    },
    skip: !cartId,
    notifyOnNetworkStatusChange: true,
  });

  const createCart = async () => {
    try {
      const response = await fetchCartId();
      if (response) {
        storage.setItem(localStorageKeys.CART_ID, response.data.cartId);
      }
    } catch (error: any) {
      toast.error("Cart not create!");
    }
  };

  const createCartAfterSignIn = async (token: string) => {
    try {
      const response = await fetchCartIdAfterSignIn({
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });
      return response;
    } catch (error: any) {
      toast.error("Cart not create!");
    }
  };

  useEffect(() => {
    (async () => {
      if (cartId) {
        await refetchCartDetails();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        cartDetails: cartDetailsData?.cart,
        cartLoading,
        cartId,
        refetchCartDetails,
        createCart,
        createCartAfterSignIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
