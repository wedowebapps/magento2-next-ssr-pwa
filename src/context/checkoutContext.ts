"use client";

import { CartDetailsType } from "@/types";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { createContext } from "react";

interface CheckoutContextType {
  cartDetails: CartDetailsType;
  cartId: string;
  isEmailAvailable: boolean;
  cartLoading: boolean;
  refetchCartDetails: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
  handleVerifyEmailAvailable: (email: string) => Promise<any>;
}

const contextData: CheckoutContextType = {
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
  cartId: "",
  isEmailAvailable: true,
  cartLoading: false,
  refetchCartDetails: () =>
    Promise.resolve(null as unknown as ApolloQueryResult<any>),
  handleVerifyEmailAvailable: () => Promise.resolve(null as unknown),

  // Other properties in SidebarContextType
};

export const CheckoutContext = createContext<CheckoutContextType>(contextData);
