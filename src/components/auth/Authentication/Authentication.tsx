"use client";
import { useAppContext } from "@/context";
import clsx from "clsx";
import { FC, useState } from "react";
import { Login, Register } from "@/components";

export interface AuthenticationProps {}

export type Tab = "login" | "register";

export const Authentication: FC<AuthenticationProps> = () => {
  const [activeMenu, setActiveMenu] = useState<Tab>("login");
  const { setIsAccountDrawerOpen } = useAppContext();

  const tabList: { label: string; value: Tab }[] = [
    {
      label: "Login",
      value: "login",
    },
    {
      label: "Register",
      value: "register",
    },
  ];

  const handleTabChange = (tab: Tab) => {
    if (tab) {
      setActiveMenu(tab);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 border-b p-2">
        <div className="flex gap-4">
          {tabList.map((menu, index) => (
            <button
              className={clsx("font-semibold", [
                { "text-secondary-500": menu.value !== activeMenu },
                { "text-primary-500": menu.value === activeMenu },
              ])}
              key={index}
              onClick={() => handleTabChange(menu.value)}
            >
              {menu.label}
            </button>
          ))}
        </div>
        <div>
          <button
            className="p-4 font-bold btn btn-ghost"
            onClick={() => setIsAccountDrawerOpen(false)}
          >
            X
          </button>
        </div>
      </div>
      {activeMenu === "login" && <Login handleTabChange={handleTabChange} />}
      {activeMenu === "register" && (
        <Register handleTabChange={handleTabChange} />
      )}
    </div>
  );
};
