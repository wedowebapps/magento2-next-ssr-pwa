"use client";
import {
  Authentication,
  Avatar,
  Drawer,
  UserAccountDrawer,
} from "@/components";
import { useAppContext } from "@/context";
import { FC, Fragment } from "react";

export interface UserDrawerProps {}

export const UserDrawer: FC<UserDrawerProps> = () => {
  const { isAccountDrawerOpen, authToken, setIsAccountDrawerOpen } =
    useAppContext();

  return (
    <Fragment>
      <button
        className="btn btn-ghost btn-circle text-white"
        onClick={() => setIsAccountDrawerOpen((prev) => !prev)}
      >
        <div tabIndex={0} role="button">
          <Avatar />
        </div>
      </button>

      <Drawer
        isOpen={isAccountDrawerOpen}
        setIsOpen={() => setIsAccountDrawerOpen((prev) => !prev)}
      >
        <div className={authToken ? "block" : "hidden"}>
          <UserAccountDrawer />
        </div>
        <div className={authToken ? "hidden" : "block"}>
          <Authentication />
        </div>
      </Drawer>
    </Fragment>
  );
};
