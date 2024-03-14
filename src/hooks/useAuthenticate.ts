"use client";
import { FetchResult, useMutation } from "@apollo/client";
import { BrowserPersistence, localStorageKeys } from "@/utils";
import { toast } from "react-toastify";
import { useAppContext, useCartContext } from "@/context";
import { LoginFormValue, RegisterFormValue } from "@/components";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "@/redux/userSlice";
import { Mutations } from "@/utils/graphql";

export interface UseAuthenticateProps {}

export interface UseAuthenticateReturns {
  loginLoading: boolean;
  registerLoading: boolean;
  handleLogout: () => any;
  handleRegister: (
    value: RegisterFormValue,
  ) => Promise<FetchResult<any> | undefined>;
  handleLogin: (
    value: LoginFormValue,
    methods: UseFormReturn<LoginFormValue, any, LoginFormValue>,
  ) => any;
}

export const useAuthenticate = (): UseAuthenticateReturns => {
  const { CREATE_CUSTOMER, GENERATE_CUSTOMER_TOKEN, USER_LOGOUT, MERGE_CART } =
    Mutations;
  const storage = new BrowserPersistence();
  const dispatch = useDispatch();
  const { setAuthToken, setIsAccountDrawerOpen } = useAppContext();
  const { cartDetails, refetchCartDetails, createCartAfterSignIn } =
    useCartContext();

  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [generateCustomerToken] = useMutation(GENERATE_CUSTOMER_TOKEN);
  const [userLogout] = useMutation(USER_LOGOUT);
  const [mergeCarts] = useMutation(MERGE_CART);

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const sourceCartId = cartDetails?.id;

  const handleRegister = async (value: RegisterFormValue) => {
    const payload = {
      input: {
        ...value,
      },
    };
    try {
      setRegisterLoading(true);
      return await createCustomer({ variables: payload });
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLogin = async (
    value: LoginFormValue,
    methods: UseFormReturn<LoginFormValue, any, LoginFormValue>,
  ) => {
    try {
      setLoginLoading(true);
      await refetchCartDetails();
      const response = await generateCustomerToken({ variables: value });
      if (response) {
        const newAuthToken = response?.data?.generateCustomerToken?.token;

        dispatch(setToken({ token: newAuthToken }));
        const cart = await createCartAfterSignIn(newAuthToken);
        const newCart = cart?.data?.cartId;

        await mergeCarts({
          variables: {
            destinationCartId: newCart,
            sourceCartId,
          },
          context: { headers: { Authorization: `Bearer ${newAuthToken}` } },
        });

        storage.setItem(localStorageKeys.CART_ID, newCart);
        methods.reset();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response) {
        dispatch(clearToken({ type: "clearToken" }));
        setAuthToken("");
        setIsAccountDrawerOpen(false);
        toast.success(
          "Logout successful. Thank you for using our services. Have a great day!",
        );
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };
  return {
    loginLoading,
    registerLoading,
    handleLogout,
    handleRegister,
    handleLogin,
  };
};
