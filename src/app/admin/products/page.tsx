import Link from 'next/link';
import Image from 'next/image';
import { getProductsPaginated } from '@/actions/admin/product-actions';
import { DeleteProductButton } from './ui/DeleteProductButton';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const { products, totalPages } = await getProductsPaginated(page, 10);

  return (
    <div className="px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Productos</h1>
        <Link href="/admin/products/new" className="btn-primary w-full sm:w-auto text-center">
          + Nuevo Producto
        </Link>
      </div>

      {/* Vista de tabla para desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Imagen
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Título
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Precio
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoría
              </th>
              <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 lg:px-6 py-4">
                  <Image
                    src={`/products/${product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>
                <td className="px-4 lg:px-6 py-4 font-medium">{product.title}</td>
                <td className="px-4 lg:px-6 py-4">${product.price}</td>
                <td className="px-4 lg:px-6 py-4">{product.inStock}</td>
                <td className="px-4 lg:px-6 py-4">{product.category.name}</td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/products/${product.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móvil */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-4 mb-3">
              <Image
                src={`/products/${product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                alt={product.title}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{product.title}</h3>
                <p className="text-lg font-bold text-blue-600">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.inStock}</p>
                <p className="text-sm text-gray-500">{product.category.name}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t">
              <Link
                href={`/admin/products/${product.slug}`}
                className="flex-1 text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Editar
              </Link>
              <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/products?page=${p}`}
              className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
