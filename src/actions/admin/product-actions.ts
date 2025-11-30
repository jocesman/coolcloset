'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  inStock: number;
  slug: string;
  tags: string;
  gender: string;
  categoryId: string;
  sizes: string[];
  images: string[];
};

export async function getProductsPaginated(page: number = 1, take: number = 10) {
  const skip = (page - 1) * take;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take,
      include: {
        ProductImage: {
          take: 1,
        },
        category: true,
      },
      orderBy: {
        title: 'asc',
      },
    }),
    prisma.product.count(),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / take),
  };
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      ProductImage: true,
      category: true,
    },
  });

  return product;
}

export async function createProduct(data: ProductFormData) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return { ok: false, message: 'No autorizado' };
  }

  try {
    const { images, tags, categoryId, ...productData } = data;

    const product = await prisma.product.create({
      data: {
        ...productData,
        gender: productData.gender as any,
        tags: tags.split(',').map((t) => t.trim()),
        sizes: productData.sizes as any,
        category: {
          connect: { id: categoryId },
        },
        ProductImage: {
          createMany: {
            data: images.map((url) => ({ url })),
          },
        },
      },
    });

    revalidatePath('/admin/products');
    return { ok: true, product };
  } catch (error: any) {
    console.error(error);
    return { ok: false, message: error.message || 'Error al crear producto' };
  }
}

export async function updateProduct(slug: string, data: ProductFormData) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return { ok: false, message: 'No autorizado' };
  }

  try {
    const { images, tags, categoryId, ...productData } = data;

    // Eliminar imágenes anteriores
    await prisma.productImage.deleteMany({
      where: { product: { slug } },
    });

    // Actualizar producto
    const product = await prisma.product.update({
      where: { slug },
      data: {
        ...productData,
        gender: productData.gender as any,
        tags: tags.split(',').map((t) => t.trim()),
        sizes: productData.sizes as any,
        category: {
          connect: { id: categoryId },
        },
        ProductImage: {
          createMany: {
            data: images.map((url) => ({ url })),
          },
        },
      },
    });

    revalidatePath('/admin/products');
    revalidatePath(`/product/${slug}`);
    return { ok: true, product };
  } catch (error: any) {
    console.error(error);
    return { ok: false, message: error.message || 'Error al actualizar producto' };
  }
}

export async function deleteProduct(id: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return { ok: false, message: 'No autorizado' };
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/products');
    return { ok: true };
  } catch (error) {
    return { ok: false, message: 'Error al eliminar producto' };
  }
}
