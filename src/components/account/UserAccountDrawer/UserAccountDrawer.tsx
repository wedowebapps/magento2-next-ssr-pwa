"use client";
import { useAppContext } from "@/context";
import { FC } from "react";
import { useAuthenticate } from "@/hooks";
import { useRouter } from "next/navigation";
import { accountMenuList } from "@/utils";

export interface UserAccountDrawerProps {}

export const UserAccountDrawer: FC<UserAccountDrawerProps> = () => {
  const router = useRouter();
  const { setIsAccountDrawerOpen } = useAppContext();
  const { handleLogout } = useAuthenticate();

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between items-center border-b">
        <span className="p-4 font-bold text-lg">Account Drawer</span>
        <button
          className="p-4 font-bold btn btn-ghost"
          onClick={() => setIsAccountDrawerOpen(false)}
        >
          Close
        </button>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {accountMenuList.map((item, index) => (
          <button
            key={index}
            className="px-2 py-3 bg-gray-100 rounded hover:bg-primary-500 hover:text-white text-left"
            onClick={() => {
              router.push(`/${item?.path}`);
              setIsAccountDrawerOpen(false);
            }}
          >
            {item?.menu}
          </button>
        ))}

        <button
          className="px-2 py-3 bg-gray-100 rounded hover:bg-primary-500 hover:text-white text-left"
          onClick={() => {
            handleLogout();
            setIsAccountDrawerOpen(false);
          }}
        >
          {"Signout"}
        </button>
      </div>
    </div>
  );
};
