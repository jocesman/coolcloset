'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function getUserOrders() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: true,
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las órdenes',
    };
  }
}
