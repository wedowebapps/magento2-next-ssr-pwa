import { ProductCard, Swiper } from "@/components";
import { Product } from "@/types";
import { FC } from "react";

export interface NewArrivalsProductProps {
  newArrivals: any;
}

const getSlidesList = (products: Product[]) => {
  const slides = products.map((product, index) => (
    <div key={index} className="w-full h-full">
      <ProductCard product={product} />
    </div>
  ));

  return slides;
};

const sliderConfiguration = {
  slidesPerView: 1,
  // autoplay: { delay: 3000, disableOnInteraction: false },
  breakpoints: {
    1536: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    450: {
      slidesPerView: 1.3,
      spaceBetween: 15,
    },
  },
};

export const NewArrivalsProduct: FC<NewArrivalsProductProps> = ({
  newArrivals,
}) => {
  return (
    <div className="">
      <Swiper
        sliderConfig={sliderConfiguration}
        slides={getSlidesList(newArrivals.items)}
        classes={{
          swiperContainer: "h-96",
        }}
      />
    </div>
  );
};
