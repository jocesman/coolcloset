import { getProductBySlug } from '@/actions/admin/product-actions';
import { getCategories } from '@/actions/admin/category-actions';
import { ProductForm } from '../ui/ProductForm';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar Producto</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
