'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/actions/admin/product-actions';
import { ImageUpload } from '@/components';
import clsx from 'clsx';

type FormData = {
  title: string;
  description: string;
  price: number;
  inStock: number;
  slug: string;
  tags: string;
  gender: string;
  categoryId: string;
  sizes: string[];
};

interface Props {
  product?: any;
  categories: { id: string; name: string }[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const genders = [
  { value: 'men', label: 'Hombres' },
  { value: 'women', label: 'Mujeres' },
  { value: 'kid', label: 'Niños' },
  { value: 'unisex', label: 'Unisex' },
];

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productImages, setProductImages] = useState<string[]>(
    product?.ProductImage?.map((img: any) => img.url) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: product
      ? {
          ...product,
          tags: product.tags.join(', '),
        }
      : {
          sizes: [],
        },
  });

  const selectedSizes = watch('sizes') || [];

  const toggleSize = (size: string) => {
    const current = selectedSizes;
    if (current.includes(size)) {
      setValue(
        'sizes',
        current.filter((s) => s !== size)
      );
    } else {
      setValue('sizes', [...current, size]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage('');

    // Validar que haya al menos una imagen
    if (productImages.length === 0) {
      setMessage('Debes subir al menos una imagen');
      setIsSubmitting(false);
      return;
    }

    const formData = {
      ...data,
      price: Number(data.price),
      inStock: Number(data.inStock),
      images: productImages,
    };

    const result = product
      ? await updateProduct(product.slug, formData)
      : await createProduct(formData);

    if (result.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setMessage(result.message || 'Error al guardar producto');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6">
      {message && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-2">Título *</label>
          <input
            type="text"
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.title,
            })}
            {...register('title', { required: 'El título es requerido' })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2">Slug *</label>
          <input
            type="text"
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.slug,
            })}
            {...register('slug', { required: 'El slug es requerido' })}
          />
          {errors.slug && (
            <span className="text-red-500 text-sm">{errors.slug.message}</span>
          )}
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Descripción *</label>
          <textarea
            rows={4}
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.description,
            })}
            {...register('description', { required: 'La descripción es requerida' })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium mb-2">Precio *</label>
          <input
            type="number"
            step="0.01"
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.price,
            })}
            {...register('price', { required: 'El precio es requerido', min: 0 })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-2">Stock *</label>
          <input
            type="number"
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.inStock,
            })}
            {...register('inStock', { required: 'El stock es requerido', min: 0 })}
          />
          {errors.inStock && (
            <span className="text-red-500 text-sm">{errors.inStock.message}</span>
          )}
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium mb-2">Género *</label>
          <select
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.gender,
            })}
            {...register('gender', { required: 'El género es requerido' })}
          >
            <option value="">Seleccionar...</option>
            {genders.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">{errors.gender.message}</span>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium mb-2">Categoría *</label>
          <select
            className={clsx('p-2 border rounded w-full', {
              'border-red-500': errors.categoryId,
            })}
            {...register('categoryId', { required: 'La categoría es requerida' })}
          >
            <option value="">Seleccionar...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-red-500 text-sm">{errors.categoryId.message}</span>
          )}
        </div>

        {/* Tallas */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Tallas *</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={clsx('px-4 py-2 rounded border', {
                  'bg-blue-600 text-white border-blue-600': selectedSizes.includes(size),
                  'bg-white text-gray-700 border-gray-300': !selectedSizes.includes(size),
                })}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && (
            <span className="text-red-500 text-sm">Selecciona al menos una talla</span>
          )}
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Tags (separados por coma)
          </label>
          <input
            type="text"
            placeholder="casual, verano, deportivo"
            className="p-2 border rounded w-full"
            {...register('tags')}
          />
        </div>

        {/* Imágenes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Imágenes del Producto *
          </label>
          <ImageUpload
            images={productImages}
            onChange={setProductImages}
            maxImages={5}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx({
            'btn-primary': !isSubmitting,
            'btn-disabled': isSubmitting,
          })}
        >
          {isSubmitting ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
