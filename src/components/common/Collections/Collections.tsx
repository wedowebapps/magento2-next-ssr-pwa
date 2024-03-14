import Image from "next/image";
import { FC } from "react";
import "@/styles/collections.css";

export interface CollectionsProps {}

export const Collections: FC<CollectionsProps> = () => {
  return (
    <section id="collection">
      <div className="collections">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div className="content" key={index}>
              <Image
                className="object-contain"
                height={1000}
                width={1000}
                src="https://i.postimg.cc/Xqmwr12c/clothing.webp"
                alt="img"
              />
              <div className="img-content">
                <p>Clothing Collections</p>
                <button className="btn btn-success">
                  <a href="#sellers">SHOP NOW</a>
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
