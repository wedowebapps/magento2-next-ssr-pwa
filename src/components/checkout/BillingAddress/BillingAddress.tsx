"use client";
import {
  CheckoutDisplayAddress,
  CountrySelector,
  Form,
  Input,
  LoadingDots,
  RegionSelector,
  Typography,
} from "@/components";
import { billingAddressSchema } from "@/utils";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { CheckoutContext } from "@/context";
import { useCheckoutAddress } from "@/hooks";

export interface BillingAddressProps {}

export interface BillingFormValue {
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

export const BillingAddress: FC<BillingAddressProps> = () => {
  const { cartDetails, refetchCartDetails } = useContext(CheckoutContext);
  const [country, setCountry] = useState<Option>();
  const [region, setRegion] = useState<Option>();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const { handleSetBillingAddress, addBillingAddressLoading } =
    useCheckoutAddress();

  const billingAddress = cartDetails?.billing_address;

  const initialValue = {
    firstname: billingAddress?.firstname ?? "",
    lastname: billingAddress?.lastname ?? "",
    street: billingAddress?.street[0] ?? "",
    city: billingAddress?.city ?? "",
    region: "",
    postcode: billingAddress?.postcode ?? "",
    country_code: "",
    telephone: billingAddress?.telephone ?? "",
    save_in_address_book: false,
  };

  const handleFormSubmit = async (value: BillingFormValue) => {
    const response = await handleSetBillingAddress(value);
    if (response) {
      await refetchCartDetails();
      setIsFormOpen(false);
    }
  };

  useEffect(() => {
    if (billingAddress) {
      setIsFormOpen(false);
    }
  }, [billingAddress]);

  return (
    <Fragment>
      <div className="flex justify-between items-center border-b-2 border-neutral-200">
        <Typography variant="h6" className="pb-2">
          Billing Address
        </Typography>
        {billingAddress && (
          <div className="pb-2">
            <button
              className="btn btn-ghost"
              onClick={() => setIsFormOpen((prev) => !prev)}
            >
              {isFormOpen ? "Cancel" : "Change"}
            </button>
          </div>
        )}
      </div>
      {addBillingAddressLoading ? (
        <LoadingDots />
      ) : (
        <Fragment>
          {!isFormOpen ? (
            <CheckoutDisplayAddress address={billingAddress} />
          ) : (
            <Form<BillingFormValue>
              className=""
              onSubmit={(value) => handleFormSubmit(value)}
              schema={billingAddressSchema}
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
