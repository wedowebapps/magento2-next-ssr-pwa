"use client";
import { Form, Input, LoadingDots, Typography } from "@/components";
import { identificationSchema } from "@/utils";
import { useMutation } from "@apollo/client";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { CheckoutContext } from "@/context";
import { useAuthenticate } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Mutations } from "@/utils/graphql";

export interface IdentificationProps {}

interface IdentificationForm {
  email: string;
  password: string;
}

export const Identification: FC<IdentificationProps> = () => {
  const userSelector = useSelector((state: RootState) => state?.user);
  const { SET_EMAIL_FOR_GUEST } = Mutations;
  const {
    cartDetails,
    cartId,
    cartLoading,
    refetchCartDetails,
    handleVerifyEmailAvailable,
    isEmailAvailable,
  } = useContext(CheckoutContext);
  const { handleLogin } = useAuthenticate();

  const [setEmailForGuest, { loading: serEmailForGuestLoading }] =
    useMutation(SET_EMAIL_FOR_GUEST);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [isEmailVerified, setEmailVerified] = useState(false);

  const handleSetGuestEmail = async (email: string) => {
    const payload = {
      input: {
        cart_id: cartId,
        email,
      },
    };
    try {
      const response = await setEmailForGuest({ variables: payload });
      if (response) {
        await refetchCartDetails();
      }
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (cartDetails?.email) {
      setIsFormOpen(false);
    }
  }, [cartDetails?.email]);

  return (
    <div className="flex flex-col  gap-2 card bg-base-200  p-4 rounded">
      <div className="flex justify-between items-center border-b-2 border-neutral-200">
        <Typography variant="h6" className="pb-2">
          Identification
        </Typography>
        {isEmailAvailable && cartDetails?.email && (
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
      {serEmailForGuestLoading ? (
        <LoadingDots />
      ) : (
        <Fragment>
          {isFormOpen ? (
            <div className="flex flex-col gap-4 w-full">
              <span>
                In order to better assist you,please enter your email address
              </span>
              <Form<IdentificationForm>
                className=""
                onSubmit={handleLogin}
                schema={identificationSchema}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full">
                    <Input
                      placeholder="Email"
                      name="email"
                      className=""
                      value={emailValue}
                      onChange={(value: any) =>
                        setEmailValue(value.target.value)
                      }
                    />
                  </div>
                  {!isEmailAvailable && (
                    <div className="w-full">
                      <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        className=""
                      />
                    </div>
                  )}

                  <div className="flex justify-end">
                    {!isEmailVerified ? (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="btn bg-primary-500 text-white hover:text-primary-500 hover:bg-white"
                          onClick={async () => {
                            handleVerifyEmailAvailable(emailValue);
                            setEmailVerified(true);
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn bg-primary-500 text-white hover:text-primary-500 hover:bg-white"
                          onClick={async () => handleSetGuestEmail(emailValue)}
                        >
                          Continue as guest
                        </button>

                        {!isEmailAvailable && (
                          <button
                            type="submit"
                            className="btn bg-primary-500 text-white hover:text-primary-500 hover:bg-white"
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {!isEmailAvailable && (
                <span>
                  Hi,{" "}
                  {`${userSelector?.currentUser?.firstname} ${userSelector?.currentUser?.lastname}`}
                </span>
              )}
              <span>your email is</span>
              <span>{cartDetails?.email}</span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};
