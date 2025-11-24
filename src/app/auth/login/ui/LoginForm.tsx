'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { login } from '@/actions/auth/login';

type FormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setErrorMessage('');

    const { email, password } = data;
    const response = await login(email.toLowerCase(), password);

    if (!response.ok) {
      setErrorMessage(response.message || 'Error al iniciar sesión');
      setIsLoading(false);
      return;
    }

    // Redirigir al home
    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type="email"
        autoFocus
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
        {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
