"use client";
import { BillingFormValue, ShippingFormValue } from "@/components";
import { CheckoutContext } from "@/context";
import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Mutations } from "@/utils/graphql";

export interface UseCheckoutAddressProps {}

type ShippingAddressParam = {
  value: ShippingFormValue;
  isBillingAddressSame: boolean;
};

export interface UseCheckoutAddressReturns {
  handleSetShippingAddress: (param: ShippingAddressParam) => any;
  handleSetBillingAddress: (param: BillingFormValue) => any;
  addShippingAddressLoading: boolean;
  addBillingAddressLoading: boolean;
}

export const useCheckoutAddress = (): UseCheckoutAddressReturns => {
  const { ADD_SHIPPING_ADDRESS, ADD_BILLING_ADDRESS } = Mutations;

  const { cartId, refetchCartDetails } = useContext(CheckoutContext);
  const [addShippingAddress, { loading: addShippingAddressLoading }] =
    useMutation(ADD_SHIPPING_ADDRESS);
  const [addBillingAddress, { loading: addBillingAddressLoading }] =
    useMutation(ADD_BILLING_ADDRESS);

  const handleSetBillingAddress = async (value: BillingFormValue) => {
    const payload = {
      input: {
        cart_id: cartId,
        billing_address: {
          address: {
            ...value,
            street: [value.street],
          },
        },
      },
    };
    try {
      const response = await addBillingAddress({ variables: payload });
      if (response) {
        await refetchCartDetails();
      }
    } catch (error: any) {}
  };

  const handleSetShippingAddress = async ({
    value,
    isBillingAddressSame,
  }: ShippingAddressParam) => {
    const payload = {
      input: {
        cart_id: cartId,
        shipping_addresses: [
          {
            address: {
              ...value,
              street: [value.street],
            },
          },
        ],
      },
    };

    try {
      if (!isBillingAddressSame) {
        await handleSetBillingAddress(value);
      }
      return await addShippingAddress({ variables: payload });
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return {
    handleSetShippingAddress,
    handleSetBillingAddress,
    addShippingAddressLoading,
    addBillingAddressLoading,
  };
};
