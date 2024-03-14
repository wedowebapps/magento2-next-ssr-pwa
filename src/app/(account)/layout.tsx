"use client";

import { AccountSidebar } from "@/components";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row py-8 gap-4">
      <div className="">
        <AccountSidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
