"use client";

import { BrowserPersistence, localStorageKeys } from "@/utils";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomerDetails } from "@/types";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { Queries } from "@/utils/graphql";

interface AppContextType {
  isMiniCartOpen: boolean;
  isGlobalSearchOpen: boolean;
  isAccountDrawerOpen: boolean;
  authToken: string;
  setIsMiniCartOpen: Dispatch<SetStateAction<boolean>>;
  setIsGlobalSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsAccountDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setAuthToken: Dispatch<SetStateAction<string>>;
}
export interface AppContextProviderProps {
  children: ReactNode;
}

const contextData: AppContextType = {
  isMiniCartOpen: false,
  isGlobalSearchOpen: false,
  isAccountDrawerOpen: false,
  authToken: "",
  setIsMiniCartOpen: () => null,
  setIsGlobalSearchOpen: () => null,
  setIsAccountDrawerOpen: () => null,
  setAuthToken: () => null,

  // Other properties in SidebarContextType
};

const AppContext = createContext(contextData);

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const storage = new BrowserPersistence();
  const token: string = storage.getItem(localStorageKeys.AUTH_TOKEN);
  const { CUSTOMER_DETAILS } = Queries;

  const dispatch = useDispatch();

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string>("");

  const [
    getCustomerDetails,
    { data: customerData, loading: fetchCustomerDetailsLoading },
  ] = useLazyQuery<CustomerDetails>(CUSTOMER_DETAILS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    (async () => {
      if (authToken) {
        try {
          const response = await getCustomerDetails();
          const currentUser = response?.data?.customer;
          if (currentUser) {
            dispatch(
              setCurrentUser({
                email: currentUser?.email,
                firstname: currentUser?.firstname,
                lastname: currentUser?.lastname,
              }),
            );
          }
        } catch (error: any) {
          toast.error("Something went wrong!");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <AppContext.Provider
      value={{
        isMiniCartOpen,
        isGlobalSearchOpen,
        isAccountDrawerOpen,
        authToken,
        setIsMiniCartOpen,
        setIsGlobalSearchOpen,
        setIsAccountDrawerOpen,
        setAuthToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
