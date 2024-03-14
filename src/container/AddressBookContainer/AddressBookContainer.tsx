"use client";
import {
  DeleteIcon,
  LoadingDots,
  Modal,
  NotFound,
  Typography,
  UpdateCustomerAddress,
} from "@/components";
import { FC, Fragment, useEffect, useState } from "react";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import {
  CustomerAddress,
  CustomerCountry,
  FetchCustomerAddress,
} from "@/types";
import { Mutations, Queries } from "@/utils/graphql";
import { useDisclosure } from "@/hooks";
import { toast } from "react-toastify";

export interface AddressBookContainerProps {}
export interface AccountAddressProps {
  address: CustomerAddress;
  countries: CustomerCountry[];
  onClick: (address: any) => void;
  getCustomerAddress: LazyQueryExecFunction<
    FetchCustomerAddress,
    OperationVariables
  >;
}

const AccountAddress: FC<AccountAddressProps> = ({
  address,
  countries,
  onClick,
  getCustomerAddress,
}) => {
  const filterCurrantCountry = countries?.find(
    (x) => x.id === address?.country_code,
  );

  const { DELETE_CUSTOMER_ADDRESS } = Mutations;

  const [deleteCustomerAddress, { loading: deleteCustomerAddressLoading }] =
    useMutation(DELETE_CUSTOMER_ADDRESS);

  const street = address?.street?.join(", ");

  const handleRemoveAddress = async (id: number) => {
    try {
      const response = await deleteCustomerAddress({ variables: { id } });
      if (response) {
        toast.success("The address has been successfully removed.");
        await getCustomerAddress();
      }
    } catch (error: any) {
      toast.error("Something went wrong, Address not deleted!");
    }
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col gap-1 rounded">
      <div className="flex justify-between">
        <Typography variant="h6" className="font-bold">
          {`${address?.firstname} ${address?.lastname}`}
        </Typography>
        {address?.default_shipping && (
          <div className="badge badge-lg text-xs">default</div>
        )}
        {!address?.default_shipping && (
          <div
            className="text-transparent rounded-full  cursor-pointer"
            role="button"
            onClick={async () => handleRemoveAddress(address?.id)}
          >
            <div
              className={
                deleteCustomerAddressLoading
                  ? "block loading text-primary-500 "
                  : "hidden"
              }
            ></div>
            <DeleteIcon
              stroke="black"
              strokeWidth={1.5}
              className={!deleteCustomerAddressLoading ? "block" : "hidden"}
            />
          </div>
        )}
      </div>

      <Typography variant="p">{street}</Typography>
      <Typography variant="p">
        {filterCurrantCountry?.full_name_locale}
      </Typography>
      <div className="flex justify-between">
        <Typography variant="p">{address?.telephone}</Typography>
        <button>
          <span className="font-semibold" onClick={() => onClick(address)}>
            Edit
          </span>
        </button>
      </div>
    </div>
  );
};

export const AddressBookContainer: FC<AddressBookContainerProps> = () => {
  const { GET_CUSTOMER_ADDRESS } = Queries;
  const [getCustomerAddress, { data: addressData, loading: addressLoading }] =
    useLazyQuery<FetchCustomerAddress>(GET_CUSTOMER_ADDRESS, {
      fetchPolicy: "no-cache",
    });

  const [opened, handlers] = useDisclosure(false);
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddress | null>(null);

  const addresses = addressData?.customer?.addresses;
  const countries = addressData?.countries;

  useEffect(() => {
    (async () => {
      await getCustomerAddress();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      handlers.open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <div className="bg-white w-full flex-1 px-4 py-4">
          <Typography variant="h5">Address Book</Typography>
        </div>
        <div className="bg-white w-full flex-1 px-8 py-8">
          <div className={addressLoading ? "block" : "hidden"}>
            <LoadingDots />
          </div>
          <div
            className={
              addressLoading || addresses?.length
                ? "hidden"
                : "flex justify-center items-center h-full"
            }
          >
            <NotFound />
          </div>
          <div
            className={
              !addressLoading
                ? "grid grid-cols-1 grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                : "hidden"
            }
          >
            {addresses?.map((address, index) => (
              <AccountAddress
                address={address}
                countries={countries ?? []}
                key={index}
                onClick={(value) => setSelectedAddress(value)}
                getCustomerAddress={getCustomerAddress}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={opened}
        close={() => {
          setSelectedAddress(null);
          handlers.close();
        }}
      >
        <UpdateCustomerAddress
          address={selectedAddress!}
          closeModal={() => handlers.close()}
          getCustomerAddress={getCustomerAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </Modal>
    </Fragment>
  );
};
