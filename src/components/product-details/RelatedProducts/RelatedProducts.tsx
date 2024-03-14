import { ProductCard, Swiper } from "@/components";
import { ProductDetailsContext } from "@/context";
import { FC, useContext } from "react";

export interface RelatedProductsProps {}

export const RelatedProducts: FC<RelatedProductsProps> = () => {
  const { productsDetails } = useContext(ProductDetailsContext);
  const data = productsDetails?.items[0]?.related_products;

  const slides = data?.map((product, index) => (
    <div key={index} className="w-full h-full">
      <ProductCard product={product} />
    </div>
  ));

  return (
    <div className="">
      <Swiper
        sliderConfig={{
          slidesPerView: 4,
          autoplay: { delay: 3000, disableOnInteraction: false },
        }}
        slides={slides ?? []}
        classes={{
          swiperContainer: "h-96",
        }}
      />
    </div>
  );
};
