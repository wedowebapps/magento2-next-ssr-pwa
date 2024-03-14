"use router";
import { accountMenuList } from "@/utils";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

export interface AccountSidebarProps {}

export const AccountSidebar: FC<AccountSidebarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white min-w-56 px-4 py-8 flex flex-col gap-2">
      {accountMenuList?.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(`/${item.path}`)}
          className={clsx(
            "font-semibold text-left hover:bg-gray-200 py-4 px-2 rounded",
            [{ "bg-gray-200": `/${item.path}` === pathname }],
          )}
        >
          {item?.menu}
        </button>
      ))}
    </div>
  );
};
