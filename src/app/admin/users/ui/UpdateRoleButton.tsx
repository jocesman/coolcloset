'use client';

import { useState } from 'react';
import { updateUserRole } from '@/actions/admin/user-actions';

interface Props {
  userId: string;
  currentRole: string;
}

export const UpdateRoleButton = ({ userId, currentRole }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleRole = async () => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`¿Cambiar rol a ${newRole}?`)) return;

    setIsUpdating(true);
    const result = await updateUserRole(userId, newRole);

    if (result.ok) {
      window.location.reload();
    } else {
      alert(result.message);
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggleRole}
      disabled={isUpdating}
      className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
    >
      {isUpdating ? 'Actualizando...' : 'Cambiar Rol'}
    </button>
  );
};
