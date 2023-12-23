'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TregisterSchema, registerSchema } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { API } from '@/config';

const FormRegister = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TregisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: TregisterSchema) => {
    const response = await API.POST('/auth/register', values);

    if (response.msg === 'SUCCESS') {
      toast.success('Success created account');
      router.push('/login');
      reset();
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
      <input
        {...register('name')}
        type='text'
        placeholder='Name'
        className='px-4 py-2 rounded-md w-64 border border-gray-300'
      />
      {errors.name && (
        <p className='text-red-500 text-sm text-left'>{errors.name.message}</p>
      )}
      <input
        {...register('lastName')}
        type='text'
        placeholder='Last Name'
        className='px-4 py-2 rounded-md w-64 border border-gray-300'
      />
      {errors.lastName && (
        <p className='text-red-500 text-sm text-left'>
          {errors.lastName.message}
        </p>
      )}
      <input
        {...register('location')}
        type='text'
        placeholder='Location'
        className='px-4 py-2 rounded-md w-64 border border-gray-300'
      />
      {errors.location && (
        <p className='text-red-500 text-sm text-left'>
          {errors.location.message}
        </p>
      )}
      <input
        {...register('email')}
        type='email'
        placeholder='Email'
        className='px-4 py-2 rounded-md w-64 border border-gray-300'
      />
      {errors.email && (
        <p className='text-red-500 text-sm text-left'>{errors.email.message}</p>
      )}
      <input
        {...register('password')}
        type='password'
        placeholder='Password'
        className='px-4 py-2 rounded-md w-64 border border-gray-300'
      />
      {errors.password && (
        <p className='text-red-500 text-sm'>{errors.password.message}</p>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className='px-4 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-500 w-64 disabled:bg-gray-500'
      >
        {isSubmitting ? 'Loading....' : 'Submit'}
      </button>
    </form>
  );
};

export default FormRegister;
