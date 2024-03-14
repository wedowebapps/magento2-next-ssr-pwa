"use client";
import {
  CheckoutAddressList,
  CheckoutDisplayAddress,
  CountrySelector,
  Form,
  Input,
  LoadingDots,
  RegionSelector,
  Typography,
} from "@/components";
import { CheckoutContext } from "@/context";
import { useCheckoutAddress } from "@/hooks";
import { FetchCustomerAddress } from "@/types";
import { shippingAddressSchema } from "@/utils";
import { Queries } from "@/utils/graphql";
import { useLazyQuery } from "@apollo/client";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { Option } from "react-dropdown";

export interface ShippingAddressProps {
  isBillingAddressSame: boolean;
}

export interface ShippingFormValue {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  region: string;
  postcode: string;
  country_code: string;
  telephone: string;
  save_in_address_book: boolean;
}

export const ShippingAddress: FC<ShippingAddressProps> = ({
  isBillingAddressSame,
}) => {
  const { GET_CUSTOMER_ADDRESS } = Queries;
  const { cartDetails, refetchCartDetails } = useContext(CheckoutContext);

  const [country, setCountry] = useState<Option>();
  const [region, setRegion] = useState<Option>();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  const { addShippingAddressLoading, handleSetShippingAddress } =
    useCheckoutAddress();

  const [getCustomerAddress, { data: addressData, loading: addressLoading }] =
    useLazyQuery<FetchCustomerAddress>(GET_CUSTOMER_ADDRESS, {
      fetchPolicy: "no-cache",
    });

  const initialValue = {
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    region: "",
    postcode: "",
    country_code: "",
    telephone: "",
    save_in_address_book: true,
  };

  const shippingAddress = cartDetails?.shipping_addresses;
  const savedAddresses = addressData?.customer?.addresses;

  const saveShippingAddress = async (value: ShippingFormValue) => {
    const response = await handleSetShippingAddress({
      value,
      isBillingAddressSame,
    });
    if (response) {
      await refetchCartDetails();
      setIsFormOpen(false);
    }
  };

  const handleSubmit = async (value: ShippingFormValue) => {
    await saveShippingAddress(value);
  };

  useEffect(() => {
    (async () => {
      if (isAddressListOpen) {
        await getCustomerAddress();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddressListOpen]);

  useEffect(() => {
    if (shippingAddress?.length || savedAddresses?.length) {
      setIsFormOpen(false);
    }
  }, [savedAddresses?.length, shippingAddress?.length]);

  return (
    <Fragment>
      <div className="flex justify-between items-center border-b-2 border-neutral-200">
        <Typography variant="h6" className="pb-2">
          Shipping Address
        </Typography>
        <div className="flex">
          {!!shippingAddress?.length ? (
            <div className="pb-2">
              <button
                className="btn btn-ghost"
                onClick={() => setIsFormOpen((prev) => !prev)}
              >
                {isFormOpen ? "Cancel" : "Add Address"}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {addShippingAddressLoading || addressLoading ? (
        <LoadingDots />
      ) : (
        <Fragment>
          {isFormOpen ? (
            <Form<ShippingFormValue>
              className=""
              onSubmit={(value) => handleSubmit(value)}
              schema={shippingAddressSchema}
              defaultValues={initialValue}
            >
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" name="firstname" />
                  <Input placeholder="Last Name" name="lastname" />
                  <Input placeholder="Street Address" name="street" />
                  <Input placeholder="City" name="city" />

                  <CountrySelector
                    name="country_code"
                    selected={country!}
                    setSelected={setCountry}
                  />

                  <RegionSelector
                    name="region"
                    selected={region!}
                    setSelected={setRegion}
                    country={country!}
                  />

                  <Input placeholder="Zip/Postal code" name="postcode" />
                  <Input placeholder="Phone Number" name="telephone" />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-primary-500 text-white hover:text-primary-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          ) : isAddressListOpen ? (
            <CheckoutAddressList
              items={savedAddresses!}
              name="shippingAddressList"
              handleAddressSelected={async (value) => {
                const payload = {
                  firstname: value?.firstname,
                  lastname: value?.lastname,
                  street: value?.street[0],
                  city: value?.city,
                  region: value?.region?.region_code,
                  postcode: value?.postcode,
                  country_code: value?.country_code,
                  telephone: value?.telephone,
                  save_in_address_book: true,
                };
                await saveShippingAddress(payload);
              }}
            />
          ) : (
            <CheckoutDisplayAddress address={shippingAddress[0]} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
