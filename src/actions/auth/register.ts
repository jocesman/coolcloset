'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const { name, email, password } = data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        ok: false,
        message: 'El correo electrónico ya está registrado',
      };
    }

    // Hashear contraseña
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user', // Por defecto es usuario normal
      },
    });

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      ok: true,
      user: userWithoutPassword,
    };
  } catch (error: any) {
    console.error('Error registering user:', error);
    return {
      ok: false,
      message: 'Error al crear el usuario',
    };
  }
}
