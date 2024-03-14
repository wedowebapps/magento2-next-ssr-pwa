"use client";
import { FC } from "react";
import { Newsletter, OwnerLogo } from "@/components";
import Link from "next/link";
import { Queries } from "@/utils/graphql";
import { useQuery } from "@apollo/client";
import { FooterAPIResponse } from "@/types";

export interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  const { GET_FOOTER_CONTENT } = Queries;

  const { data: footerData } = useQuery<FooterAPIResponse>(GET_FOOTER_CONTENT);

  const footerMenu = footerData?.getFooterContent;

  return (
    <footer className="footer p-10 bg-primary-500 text-base-content">
      <Link href={"https://www.wedowebapps.com/"} target="_blank">
        <OwnerLogo />
        <span className="text-white">WEDOWEBAPPS PTY LTD</span>
        <span className="text-white">Copyright © 2024</span>
      </Link>
      <nav className="text-white">
        <header className="footer-title">Connect with us</header>
        <Link href={""} className="link link-hover">
          Email
        </Link>
        <Link href={""} className="link link-hover">
          Facebook
        </Link>
        <Link href={""} className="link link-hover">
          Whatsapp
        </Link>
        <Link href={""} className="link link-hover">
          Skype
        </Link>
      </nav>
      <nav className="text-white">
        <header className="footer-title">Categories</header>
        {footerMenu?.map((route, i) => (
          <Link key={i} href={`/${route.url}`} className="link link-hover">
            {route?.title}
          </Link>
        ))}
      </nav>
      <Newsletter />
    </footer>
  );
};
