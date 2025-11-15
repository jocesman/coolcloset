import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { QuantitySelector, SizeSelector } from "@/components";


interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = initialData.products.find(
    product => product.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* 🖼 Slide show */}
      <div className="col-span-1 md:col-span-2 p-4">
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          width={1200}
          height={1200}
          className="rounded-xl object-cover w-full"
        />
      </div>

      {/* 📄 Detalles */}
      <div className="col-span-1 px-5 p-4">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/*Selector de tallas*/}
        <SizeSelector 
          SelectedSize={product.sizes[1]}
          availableSizes={product.sizes}
        />

        {/*Selector de cantidad*/}

        <QuantitySelector 
          quantity={ 2 }
         />

        {/*Botón */}
        <button className="btn-primary my-5 ">Agregar al Carrito</button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>

      </div>

    </div>
  );
}
