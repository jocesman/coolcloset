'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function setTransactionId(orderId: string, transactionId: string) {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return {
        ok: false,
        message: 'Orden no encontrada',
      };
    }

    // Verificar que la orden pertenezca al usuario (a menos que sea admin)
    if (order.userId !== session.user.id && session.user.role !== 'admin') {
      return {
        ok: false,
        message: 'No autorizado',
      };
    }

    // Actualizar orden como pagada
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        transactionId: transactionId,
      },
    });

    revalidatePath(`/orders/${orderId}`);
    revalidatePath('/orders');

    return {
      ok: true,
    };
  } catch (error) {
    console.error('Error setting transaction ID:', error);
    return {
      ok: false,
      message: 'Error al procesar el pago',
    };
  }
}
