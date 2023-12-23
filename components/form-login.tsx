'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TloginSchema, loginSchema } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const FormLogin = () => {
  const router = useRouter();

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
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.ok) {
      await router.push('/dashboard');
      toast.success('Welcome to dashboard');
      reset();
    } else {
      toast.error(signInData?.error);
    }
  };

  const onSubmitTestUser = async () => {
    setIsLoading(true);
    const signInData = await signIn('credentials', {
      email: 'test@test.com',
      password: 'secret123',
      redirect: false,
    });
    if (signInData?.ok) {
      await router.push('/dashboard');
      toast.success('Take a test drive');
      setIsLoading(false);
    } else {
      toast.error(signInData?.error);
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
