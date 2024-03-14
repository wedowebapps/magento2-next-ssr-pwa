import Image from "next/image";
import { FC, useContext } from "react";
import "@/styles/home-banner.css";

import Link from "next/link";
import { HomeContext } from "@/context";

export interface HomeBannerProps {}

export const HomeBanner: FC<HomeBannerProps> = () => {
  const { homeBanner } = useContext(HomeContext);

  return (
    <section id="home">
      <div className="home_page">
        <div className="home_img">
          <Image
            priority
            width={10000}
            height={10000}
            src={homeBanner.banner_image}
            alt="home-banner "
          />
        </div>
        <div className="home_txt">
          <p className="collection">{homeBanner.title}</p>
          <div className="max-w-96">
            <h2>{homeBanner.sub_title}</h2>
          </div>

          <div className="home_label max-w-[32rem]">
            <p>{homeBanner.description}</p>
          </div>
          <button>
            <Link href="/category">SHOP NOW</Link>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
