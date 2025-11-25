'use client';

import { useState } from 'react';
import { deleteProduct } from '@/actions/admin/product-actions';

interface Props {
  id: string;
}

export const DeleteProductButton = ({ id }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    setIsDeleting(true);
    const result = await deleteProduct(id);

    if (result.ok) {
      window.location.reload();
    } else {
      alert(result.message);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex-1 md:flex-none text-center md:text-left py-2 md:py-0 bg-red-600 md:bg-transparent text-white md:text-red-600 rounded md:rounded-none hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-800 disabled:opacity-50 px-3 md:px-0"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
};
