"use client";
import Image from "next/image";
import { FC } from "react";

export interface AvatarProps {}

export const Avatar: FC<AvatarProps> = () => {
  return (
    <div className="w-10 rounded-full">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z"
          fill="currentColor"
        />
        <path
          d="M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
