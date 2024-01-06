import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import FormRegister from '@/components/form-register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Jobify',
  description: 'Register - Jobify',
};

const Page = async () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card>
        <CardContent className='py-10'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl mb-4'>Register</p>
            <FormRegister />
          </div>
          <p className='mt-2'>
            Have an account?{' '}
            <Link href='/login' className='text-sky-400'>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
