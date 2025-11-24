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
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
};
