import Image from "next/image";
import { FC } from "react";
import "@/styles/trending.css";

export interface TrendingProductsProps {}

export const TrendingProducts: FC<TrendingProductsProps> = () => {
  return (
    <section id="news">
      <div className="news-heading">
        <p>LATEST NEWS</p>
        <h2>Fashion New Trends</h2>
      </div>
      <div className="l-news flex flex-wrap">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div className="l-news1" key={index}>
              <div className="news1-img">
                <Image
                  className="object-cover"
                  width={1000}
                  height={1000}
                  src="https://i.postimg.cc/2y6wbZCm/news1.jpg"
                  alt="img"
                />
              </div>
              <div className="news1-conte">
                <div className="date-news1">
                  <p>
                    <i className="bx bxs-calendar"></i> 12 February 2022
                  </p>
                  <h4>What Curling Irons Are The Best Ones</h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
