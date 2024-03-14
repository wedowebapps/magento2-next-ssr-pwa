"use client";
import { FC, ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext, useCartContext } from "@/context";
import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/userSlice";
import { storage } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { localStorageKeys } from "@/utils";
import { MontserratFont } from "@/utils/fonts";

export interface AppProps {
  children: ReactNode;
}
export const App: FC<AppProps> = ({ children }) => {
  const { createCart } = useCartContext();
  const { authToken } = useAppContext();
  const dispatch = useDispatch();
  const isCartAvailable = storage.getItem(localStorageKeys.CART_ID);
  const path = usePathname();

  useEffect(() => {
    const item = storage.getRawItem(localStorageKeys.AUTH_TOKEN);

    // exit if there's nothing in storage
    if (!item) return;

    const { timeStored, ttl } = JSON.parse(item);
    const expectedTime = timeStored + ttl;
    const curTime = Date.now();

    if (authToken && curTime > expectedTime) {
      alert("Your session is expire. Please signin again to continue.");
      dispatch(clearToken({ type: "clearToken" }));
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    (async () => {
      if (!isCartAvailable) {
        await createCart();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartAvailable]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        newestOnTop={false}
        hideProgressBar={false}
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${MontserratFont.style.fontFamily};
          }
        `}
      </style>
      <div className=" font-montserrat pt-20 min-h-[40.8rem]">{children}</div>
    </div>
  );
};
