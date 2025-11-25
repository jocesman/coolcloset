'use server';

import prisma from '@/lib/prisma';

export async function searchProducts(query: string) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              has: query.toLowerCase(),
            },
          },
        ],
      },
      include: {
        ProductImage: {
          take: 1,
        },
      },
      take: 20,
    });

    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
