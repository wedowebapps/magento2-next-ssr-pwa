"use client";
import { GlobalSearch, HeartIcon, UserDrawer } from "@/components";
import { useAppContext, useCartContext } from "@/context";
import { HeaderAPIResponse } from "@/types";
import { Queries } from "@/utils/graphql";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { GET_HEADER_CONTENT } = Queries;
  const pathname = usePathname();
  const router = useRouter();
  const { authToken, setIsAccountDrawerOpen } = useAppContext();
  const { cartDetails } = useCartContext();

  const { data: headerData } = useQuery<HeaderAPIResponse>(GET_HEADER_CONTENT);

  const routesMap = headerData?.getHeaderContent;

  return (
    <div className="navbar py-4 px-4 bg-primary-500 text-base-content fixed z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routesMap?.map((route, i) => (
              <li key={i}>
                <Link href={`/${route?.url}`}>{route?.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/`} className="btn btn-ghost text-xl text-white">
          Wedo Commerce
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-white">
          {routesMap?.map((route, i) => {
            const currentPath = route?.url.split("?")[0];

            return (
              <li key={i}>
                <Link
                  className={clsx("", [
                    { active: `/${currentPath}` === `${pathname}` },
                  ])}
                  href={`/${route?.url}`}
                >
                  {route?.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2 items-center">
          <GlobalSearch />

          <button
            className="btn btn-ghost p-0 text-transparent"
            onClick={() => {
              if (authToken) {
                router.push("/wishlist");
              } else {
                setIsAccountDrawerOpen(true);
              }
            }}
          >
            <HeartIcon
              height={28}
              width={28}
              stroke="white"
              strokeWidth={1.5}
            />
          </button>

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
            onClick={() => router.push("/cart")}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartDetails?.total_quantity}
              </span>
            </div>
          </div>
          <UserDrawer />
        </div>
      </div>
    </div>
  );
};
