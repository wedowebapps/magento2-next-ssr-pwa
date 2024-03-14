"use client";
import React, { Fragment, useState } from "react";
import { Swiper as BaseSwiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import {
  Navigation,
  Pagination,
  Autoplay,
  FreeMode,
  Thumbs,
} from "swiper/modules";
import SwiperTypes from "swiper";
import { SwiperOptions } from "swiper/types";

interface SwiperProps {
  slides: React.ReactNode[];
  classes?: {
    swiperContainer?: string;
    thumbs?: string;
    thumb?: string;
  };
  sliderConfig?: SwiperOptions;
  slideThumbsShow?: boolean;
  thumbsSlideConfig?: SwiperOptions;
}

const defaultConfig = {
  spaceBetween: 50,
};

export const Swiper: React.FC<SwiperProps> = ({
  slides,
  classes,
  sliderConfig,
  slideThumbsShow,
  thumbsSlideConfig,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);

  return (
    <Fragment>
      <BaseSwiper
        className={`${classes?.swiperContainer}`}
        style={
          {
            "--swiper-navigation-color": "#d2d2d2",
            "--swiper-pagination-color": "#d2d2d2",
          } as any
        }
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Pagination, Autoplay, FreeMode, Thumbs]}
        {...defaultConfig}
        {...sliderConfig}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </BaseSwiper>
      {slideThumbsShow && (
        <BaseSwiper
          onSwiper={(swiper: SwiperTypes) => setThumbsSwiper(swiper)}
          freeMode={true}
          watchSlidesProgress={true}
          className={`${classes?.thumbs}`}
          {...thumbsSlideConfig}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={`${classes?.thumb}`}>
              {slide}
            </SwiperSlide>
          ))}
        </BaseSwiper>
      )}
    </Fragment>
  );
};
