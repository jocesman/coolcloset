import { ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { notFound } from 'next/navigation';
import { Gender } from '@prisma/client';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  // Validar categoría
  const validCategories = ['men', 'women', 'kid', 'unisex'];
  
  if (!validCategories.includes(id)) {
    notFound();
  }

  // Obtener productos reales de la base de datos filtrados por género
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: id as Gender,
  });

  const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  };

  return (
    <>
      <Title
        title={`Artículos para ${labels[id]}`}
        subtitle="Todos los artículos"
        className="mb-2"
      />

      <ProductGrid products={products} />
      
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/category/${id}?page=${p}`}
              className={`px-4 py-2 rounded ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export async function generateStaticParams() {
  const categories = ['men', 'women', 'kid', 'unisex'];
  return categories.map((id) => ({ id }));
}
