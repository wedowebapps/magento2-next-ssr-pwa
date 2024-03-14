"use client";
import { Swiper } from "@/components";
import { ProductDetailsContext } from "@/context";
import Image from "next/image";
import { FC, useContext } from "react";

export interface ProductCarouselProps {}

export const ProductCarousel: FC<ProductCarouselProps> = () => {
  const { productVariant } = useContext(ProductDetailsContext);

  const data = productVariant?.product?.media_gallery_entries;
  const slideData = data?.length
    ? data
    : Array(5).fill({
        file: "https://wedocommerce.wedowebapps.com/media/catalog/product/cache/d5fbc25b16b300f518d253a3906a8c45/i/s/istockphoto-1200991853-2048x2048_2.jp",
        label: "product-image",
      });

  const slides = slideData?.map((product, index) => (
    <div key={index} className="w-full h-full">
      <Image
        src={product.file}
        height={1000}
        width={1000}
        quality={100}
        alt={product.label || "product-image"}
        className="h-full w-full object-contain"
      />
    </div>
  ));

  return (
    <Swiper
      sliderConfig={{
        slidesPerView: 1,
        autoplay: { delay: 2500, disableOnInteraction: false },
      }}
      slides={slides ?? []}
      slideThumbsShow
      thumbsSlideConfig={{ spaceBetween: 10, slidesPerView: 4 }}
      classes={{
        swiperContainer: "h-96 rounded-xl overflow-hidden",
        thumbs: "h-28 mt-4",
        thumb: "rounded-xl overflow-hidden max-h",
      }}
    />
  );
};
