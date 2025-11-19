'use client';

import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css'

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ( { images, title, className } : Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={ className }>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
    } 
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
            images.map( image => (
                <SwiperSlide key={ image }>
                    <Image 
                        width={ 1024 }
                        height={ 800 }
                        src={`/products/${image}`}
                        alt= { title }
                        className="rounded object-fill"
                        />
                        {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}
