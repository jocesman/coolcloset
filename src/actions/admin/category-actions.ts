'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}

export async function createCategory(name: string) {
  // TODO: Descomentar cuando NextAuth esté configurado
  // const session = await auth();

  // if (!session?.user || session.user.role !== 'admin') {
  //   return { ok: false, message: 'No autorizado' };
  // }

  try {
    await prisma.category.create({
      data: { name },
    });

    revalidatePath('/admin/categories');
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'Error al crear categoría' };
  }
}

export async function updateCategory(id: string, name: string) {
  // TODO: Descomentar cuando NextAuth esté configurado
  // const session = await auth();

  // if (!session?.user || session.user.role !== 'admin') {
  //   return { ok: false, message: 'No autorizado' };
  // }

  try {
    await prisma.category.update({
      where: { id },
      data: { name },
    });

    revalidatePath('/admin/categories');
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'Error al actualizar categoría' };
  }
}

export async function deleteCategory(id: string) {
  // TODO: Descomentar cuando NextAuth esté configurado
  // const session = await auth();

  // if (!session?.user || session.user.role !== 'admin') {
  //   return { ok: false, message: 'No autorizado' };
  // }

  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/admin/categories');
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'Error al eliminar categoría. Puede tener productos asociados.' };
  }
}
