import FormLogin from '@/components/form-login';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Jobify',
  description: 'Login - Jobify',
};

const Page = async () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card>
        <CardContent className='py-10'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl mb-4'>Login</p>
            <FormLogin />
          </div>
          <p className='mt-2'>
            New to jobify?{' '}
            <Link href='/register' className='text-sky-400'>
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
