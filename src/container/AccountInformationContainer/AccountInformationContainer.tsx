"use client";
import { Form, Input, LoadingDots, RadioGroup, Typography } from "@/components";
import { profileSchema } from "@/utils";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FC, useEffect } from "react";
import { CustomerDetails } from "@/types";
import { toast } from "react-toastify";
import { Mutations, Queries } from "@/utils/graphql";

export interface AccountInformationContainerProps {}

export interface ProfileFormValue {
  firstname: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  gender: number;
}

export const AccountInformationContainer: FC<
  AccountInformationContainerProps
> = () => {
  const { CUSTOMER_DETAILS } = Queries;
  const { UPDATE_CUSTOMER_DETAILS } = Mutations;
  const [
    getCustomerDetails,
    { data: customerData, loading: fetchCustomerDetailsLoading },
  ] = useLazyQuery<CustomerDetails>(CUSTOMER_DETAILS, {
    fetchPolicy: "no-cache",
  });
  const [updateCustomerDetails, { loading: updateCustomerDetailsLoading }] =
    useMutation(UPDATE_CUSTOMER_DETAILS);

  const customer = customerData?.customer;

  const defaultValue = {
    firstname: customer?.firstname ?? "",
    lastname: customer?.lastname ?? "",
    email: customer?.email ?? "",
    date_of_birth: customer?.date_of_birth ?? "",
    gender: customer?.gender ?? 0,
  };

  const isLoading = fetchCustomerDetailsLoading || updateCustomerDetailsLoading;

  const handleSubmit = async (value: ProfileFormValue) => {
    const payload = {
      input: {
        ...value,
      },
    };

    try {
      const response = await updateCustomerDetails({ variables: payload });
      if (response) {
        await getCustomerDetails();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    (async () => {
      await getCustomerDetails();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white w-full flex-1 px-4 py-4">
        <Typography variant="h5">My Profile</Typography>
      </div>
      <div className="bg-white w-full flex-1 px-8 py-8">
        <div className={isLoading ? "block" : "hidden"}>
          <LoadingDots />
        </div>
        <div className={!isLoading ? "block" : "hidden"}>
          <Form<ProfileFormValue>
            className=""
            onSubmit={handleSubmit}
            schema={profileSchema}
            defaultValues={defaultValue}
            resetData={defaultValue}
          >
            <div className="flex flex-col gap-4">
              <Input
                placeholder="First Name"
                name="firstname"
                className="rounded"
              />
              <Input
                placeholder="Last Name"
                name="lastname"
                className="rounded"
              />
              <Input
                placeholder="Email"
                name="email"
                type="email"
                className="rounded"
              />
              <Input
                placeholder="Date of Birth"
                name="date_of_birth"
                type="date"
                className="rounded"
              />
              <RadioGroup
                defaultValue={customer?.gender ?? 1}
                items={[
                  { label: "Male", value: 1 },
                  { label: "Female", value: 2 },
                ]}
                name="gender"
                label="Gender"
                radioWrapper="flex gap-4"
                className="flex gap-2"
              />
              <div className="flex justify-end">
                <button
                  className="btn bg-primary-500 text-white  hover:bg-gray-600 disabled:bg-gray-400 disabled:text-white"
                  type="submit"
                  disabled={false}
                >
                  {false ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
