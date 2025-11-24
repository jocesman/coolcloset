import { getCategories } from '@/actions/admin/category-actions';
import { CategoriesManager } from './ui/CategoriesManager';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Categorías</h1>
      <CategoriesManager categories={categories} />
    </div>
  );
}
