"use client";
import {
  Checkbox,
  CountrySelector,
  Form,
  Input,
  RegionSelector,
} from "@/components";
import { CustomerAddress, FetchCustomerAddress } from "@/types";
import { updateAddressSchema } from "@/utils";
import { Mutations } from "@/utils/graphql";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Option } from "react-dropdown";
import { toast } from "react-toastify";

export interface UpdateCustomerAddressProps {
  address: CustomerAddress;
  closeModal: () => void;
  getCustomerAddress: LazyQueryExecFunction<
    FetchCustomerAddress,
    OperationVariables
  >;
  setSelectedAddress: Dispatch<SetStateAction<CustomerAddress | null>>;
}

interface AddressFormValue {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  region: {
    region_id: string;
  };
  postcode: string;
  country_code: string;
  telephone: string;
  default_shipping: boolean;
  default_billing: boolean;
}

export const UpdateCustomerAddress: FC<UpdateCustomerAddressProps> = ({
  address,
  closeModal,
  getCustomerAddress,
  setSelectedAddress,
}) => {
  const { UPDATE_CUSTOMER_ADDRESS } = Mutations;
  const [updateCustomerAddress, { loading: updateAddressLoading }] =
    useMutation(UPDATE_CUSTOMER_ADDRESS);
  const [country, setCountry] = useState<Option>();
  const [region, setRegion] = useState<Option>();

  const defaultValue = {
    firstname: address?.firstname ?? "",
    lastname: address?.lastname ?? "",
    street: address?.street[0] ?? "",
    city: address?.city ?? "",
    region: {
      region_id: undefined,
    },
    postcode: address?.postcode ?? "",
    country_code: address?.country_code ?? "",
    telephone: address?.telephone ?? "",
    default_shipping: address?.default_shipping ?? false,
    default_billing: false,
  };

  const handleFormSubmit = async (value: AddressFormValue) => {
    const region = value?.region?.region_id;
    const payload = {
      id: address?.id,
      input: {
        ...value,
        region,
        default_billing: false,
      },
    };
    try {
      const response = await updateCustomerAddress({ variables: payload });
      if (response) {
        setSelectedAddress(null);
        closeModal();
        await getCustomerAddress();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form<AddressFormValue>
      className=""
      onSubmit={handleFormSubmit}
      schema={updateAddressSchema}
      defaultValues={defaultValue}
      resetData={defaultValue}
    >
      <div className="flex flex-col gap-4 pt-8">
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
          name="region.region_id"
          selected={region!}
          setSelected={setRegion}
          country={country!}
        />

        <Input placeholder="Zip/Postal code" name="postcode" />
        <Input placeholder="Phone Number" name="telephone" />

        <Checkbox
          name="default_shipping"
          label="Make this my default address"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn bg-primary-500 text-white hover:text-primary-500 disabled:bg-gray-200"
            disabled={updateAddressLoading}
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
};
