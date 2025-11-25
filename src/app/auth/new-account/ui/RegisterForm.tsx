'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { registerUser } from '@/actions/auth/register';
import { login } from '@/actions/auth/login';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const password = watch('password');

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setErrorMessage('');

    const { name, email, password } = data;

    // Registrar usuario
    const response = await registerUser({ name, email, password });

    if (!response.ok) {
      setErrorMessage(response.message || 'Error al crear la cuenta');
      setIsLoading(false);
      return;
    }

    // Auto-login después del registro
    const loginResponse = await login(email.toLowerCase(), password);

    if (!loginResponse.ok) {
      // Si falla el login, redirigir a login manual
      router.push('/auth/login');
      return;
    }

    // Redirigir al home
    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type="text"
        autoFocus
        {...register('name', {
          required: 'El nombre es requerido',
          minLength: {
            value: 3,
            message: 'El nombre debe tener al menos 3 caracteres',
          },
        })}
      />
      {errors.name && (
        <span className="text-red-500 text-sm -mt-4 mb-2">{errors.name.message}</span>
      )}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type="email"
        {...register('email', {
          required: 'El correo es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Correo inválido',
          },
        })}
      />
      {errors.email && (
        <span className="text-red-500 text-sm -mt-4 mb-2">{errors.email.message}</span>
      )}

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type="password"
        {...register('password', {
          required: 'La contraseña es requerida',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres',
          },
        })}
      />
      {errors.password && (
        <span className="text-red-500 text-sm -mt-4 mb-2">{errors.password.message}</span>
      )}

      <label htmlFor="confirmPassword">Confirmar contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.confirmPassword,
        })}
        type="password"
        {...register('confirmPassword', {
          required: 'Debes confirmar la contraseña',
          validate: (value) => value === password || 'Las contraseñas no coinciden',
        })}
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm -mt-4 mb-2">
          {errors.confirmPassword.message}
        </span>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={clsx({
          'btn-primary': !isLoading,
          'btn-disabled': isLoading,
        })}
      >
        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ya tengo cuenta
      </Link>
    </form>
  );
};
