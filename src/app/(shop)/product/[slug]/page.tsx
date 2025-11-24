import { titleFont } from '@/config/fonts'
import { notFound } from 'next/navigation'
import { ProductMobileSlideShow, ProductSlideShow, AddToCart } from '@/components'
import prisma from '@/lib/prisma'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      ProductImage: true,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 p-4">
        {/* Mobile Slideshow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.ProductImage.map(image => image.url)}
          className="block md:hidden"
        />
        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.ProductImage.map(image => image.url)}
          className="hidden md:block"
        />
      </div>

      {/* 📄 Detalles */}
      <div className="col-span-1 px-5 p-4">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
