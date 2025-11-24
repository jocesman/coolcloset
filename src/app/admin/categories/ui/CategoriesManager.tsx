'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory, updateCategory, deleteCategory } from '@/actions/admin/category-actions';
import clsx from 'clsx';

type Category = {
  id: string;
  name: string;
};

interface Props {
  categories: Category[];
}

export const CategoriesManager = ({ categories: initialCategories }: Props) => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue,
    formState: { errors: errorsEdit },
  } = useForm<{ name: string }>();

  const onCreateCategory = async (data: { name: string }) => {
    const result = await createCategory(data.name);
    if (result.ok) {
      setMessage('Categoría creada exitosamente');
      reset();
      window.location.reload();
    } else {
      setMessage(result.message || 'Error al crear categoría');
    }
  };

  const onUpdateCategory = async (data: { name: string }) => {
    if (!editingId) return;

    const result = await updateCategory(editingId, data.name);
    if (result.ok) {
      setMessage('Categoría actualizada exitosamente');
      setEditingId(null);
      window.location.reload();
    } else {
      setMessage(result.message || 'Error al actualizar categoría');
    }
  };

  const onDeleteCategory = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    const result = await deleteCategory(id);
    if (result.ok) {
      setMessage('Categoría eliminada exitosamente');
      window.location.reload();
    } else {
      setMessage(result.message || 'Error al eliminar categoría');
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setValue('name', category.name);
  };

  return (
    <div>
      {message && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {/* Formulario de creación */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Nueva Categoría</h2>
        <form onSubmit={handleSubmit(onCreateCategory)} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nombre de la categoría"
              className={clsx('p-2 border rounded w-full', {
                'border-red-500': errors.name,
              })}
              {...register('name', { required: 'El nombre es requerido' })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <button type="submit" className="btn-primary">
            Crear
          </button>
        </form>
      </div>

      {/* Lista de categorías */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4">
                  {editingId === category.id ? (
                    <form onSubmit={handleSubmitEdit(onUpdateCategory)} className="flex gap-2">
                      <input
                        type="text"
                        className={clsx('p-2 border rounded flex-1', {
                          'border-red-500': errorsEdit.name,
                        })}
                        {...registerEdit('name', { required: 'El nombre es requerido' })}
                      />
                      <button type="submit" className="btn-primary px-4">
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-200 rounded"
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <span className="font-medium">{category.name}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId !== category.id && (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
