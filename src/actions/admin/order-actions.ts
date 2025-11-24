'use server';

import prisma from '@/lib/prisma';

export async function getOrdersPaginated(page: number = 1, take: number = 10) {
  const skip = (page - 1) * take;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.order.count(),
  ]);

  return {
    orders,
    total,
    totalPages: Math.ceil(total / take),
  };
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      OrderItem: {
        include: {
          product: {
            include: {
              ProductImage: {
                take: 1,
              },
            },
          },
        },
      },
      OrderAddress: true,
    },
  });

  return order;
}
