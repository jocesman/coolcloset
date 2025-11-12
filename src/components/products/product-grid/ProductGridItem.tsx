'use client';

import { descripcionProd } from "@/config/fonts";
import { Product } from "@/interfaces";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product } : Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in hover:text-green-700 hover:font-bold">
        <Link href={`/product/${product.slug}`}>
            <Image 
                src={`/products/${displayImage}`}
                alt={ product.title }
                className="w-full object-cover rounded-b-2xl"
                width={ 500 }
                height={ 500 }
                onMouseEnter={() => setDisplayImage(product.images[1])}
                onMouseLeave={() => setDisplayImage(product.images[0])}
            />
            </Link>
        <div className={`p-4 flex flex-col ${descripcionProd.className} text-2xl`}>
            <Link 
            className="hover:text-green-700 hover:font-bold hover:text-3xl"
            href={`/product/${product.slug}`}>
                { product.title }
            </Link>
            <span className="font-bold">${ product.price } </span>

        </div>
    </div>
  )
}
