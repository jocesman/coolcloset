'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAddressStore } from '@/store';
import clsx from 'clsx';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
};

interface Props {
  countries: { id: string; name: string }[];
}

export const AddressForm = ({ countries }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address, reset]);

  const onSubmit = (data: FormInputs) => {
    setAddress(data);
    router.push('/checkout');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <div className="flex flex-col mb-2">
        <span>Nombres *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.firstName,
          })}
          {...register('firstName', { required: 'Este campo es requerido' })}
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">{errors.firstName.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.lastName,
          })}
          {...register('lastName', { required: 'Este campo es requerido' })}
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">{errors.lastName.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.address,
          })}
          {...register('address', { required: 'Este campo es requerido' })}
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('address2')}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.postalCode,
          })}
          {...register('postalCode', { required: 'Este campo es requerido' })}
        />
        {errors.postalCode && (
          <span className="text-red-500 text-sm">{errors.postalCode.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.city,
          })}
          {...register('city', { required: 'Este campo es requerido' })}
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>País *</span>
        <select
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.country,
          })}
          {...register('country', { required: 'Este campo es requerido' })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="text-red-500 text-sm">{errors.country.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono *</span>
        <input
          type="text"
          className={clsx('p-2 border rounded-md bg-gray-200', {
            'border-red-500': errors.phone,
          })}
          {...register('phone', { required: 'Este campo es requerido' })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <button
          type="submit"
          disabled={!isValid}
          className={clsx({
            'btn-primary': isValid,
            'btn-disabled': !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
