import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

const seedProducts = initialData.products

export default async function CategoryPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  // Aquí podrías obtener datos reales
  const validCategories = ['men', 'women', 'kid', 'unisex']

  if (!validCategories.includes(id)) {
    notFound() // usa (shop)/not-found.tsx automáticamente
  }

  const products = seedProducts.filter(product => product.gender === id)

  const label: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  }

  return (
    <>
      <Title
        title={`Articulos para ${label[id]}`}
        subtitle="Todos los artículos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  )
}

export async function generateStaticParams() {
  const categories = ['men', 'women', 'kid', 'unisex']
  return categories.map(id => ({ id }))
}
