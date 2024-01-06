'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TloginSchema, loginSchema } from '@/types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { API } from '@/config';
import { setCookie } from 'cookies-next';

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: TloginSchema) => {
    const response = await API.POST('/auth/login', values);

    if (response.msg === 'SUCCESS') {
      await setCookie('access_token', response.token);
      await setCookie('refresh_token', response.refreshToken);
      reset();
      window.location.reload();
    } else {
      toast.error(response.msg);
    }
  };

  const onSubmitTestUser = async () => {
    const payload = {
      email: 'test@test.com',
      password: 'secret123',
    };

    setIsLoading(true);
    const response = await API.POST('/auth/login', payload);
    if (response.msg === 'SUCCESS') {
      await setCookie('access_token', response.token);
      await setCookie('refresh_token', response.refreshToken);
      reset();
      window.location.reload();
      setIsLoading(false);
    } else {
      toast.error(response.msg);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
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
      <button
        type='submit'
        disabled={isLoading}
        onClick={onSubmitTestUser}
        className='px-4 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-500 w-64 disabled:bg-gray-500'
      >
        {isLoading ? 'Loading....' : 'Explore the app'}
      </button>
    </form>
  );
};

export default FormLogin;
