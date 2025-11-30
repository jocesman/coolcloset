'use client'

import { useState } from 'react'
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import { getProductImage } from '@/utils/product-image-loader'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#3b38382f',
            '--swiper-pagination-color': '#3b38382f',
          } as React.CSSProperties
        }
        loop={true}
        navigation={true}
        spaceBetween={10}
        autoplay={{
          delay: 5000,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={800}
              src={getProductImage(image)}
              alt={title}
              className="rounded object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              width={300}
              height={300}
              src={getProductImage(image)}
              alt={title}
              className="rounded object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
