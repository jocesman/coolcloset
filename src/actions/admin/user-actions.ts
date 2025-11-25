'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getUsersPaginated(page: number = 1, take: number = 10) {
  const skip = (page - 1) * take;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take,
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    total,
    totalPages: Math.ceil(total / take),
  };
}

export async function updateUserRole(userId: string, role: 'admin' | 'user') {
  // TODO: Descomentar cuando NextAuth esté configurado
  // const session = await auth();

  // if (!session?.user || session.user.role !== 'admin') {
  //   return { ok: false, message: 'No autorizado' };
  // }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('/admin/users');
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'Error al actualizar rol' };
  }
}
