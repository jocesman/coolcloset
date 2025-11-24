import { getCategories } from '@/actions/admin/category-actions';
import { ProductForm } from '../ui/ProductForm';

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Nuevo Producto</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
