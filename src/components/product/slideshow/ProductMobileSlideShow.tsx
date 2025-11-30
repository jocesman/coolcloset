'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Autoplay, Pagination } from 'swiper/modules'

import { getProductImage } from '@/utils/product-image-loader'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './slideshow.css'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={10}
        autoplay={{ delay: 5000 }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={getProductImage(image)}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
