'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { TeditProfileSchema, editProfileSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { customRevalidateTag } from '@/lib/action';
import { FaRegEdit } from 'react-icons/fa';
import { API } from '@/config';
import { refreshTokenHandler } from '@/config/refreshToken';

const EditProfile = ({ token, data }: { token: string; data: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = async (values: TeditProfileSchema) => {
    const file = values.avatar[0];
    if (file && file.size > 2000000) {
      toast.error('Image size too large max 2mb');
      return null;
    }

    const payload = {
      ...values,
      avatar: file || null,
    };

    const response = await API.PATCH_UPLOAD(
      '/users/update-user',
      payload,
      token
    );

    if (response.msg === 'SUCCESS') {
      toast.success('Successfully edit profile');
      await customRevalidateTag('/dashboard/profile');
      setOpen(false);
    } else if (response.msg === 'authentication invalid') {
      refreshTokenHandler();
      toast.info('try again');
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className='gap-1'>
          <FaRegEdit className='text-2xl' />
          <span className='mt-[2px]'>Edit</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-4 mt-4'
        >
          <input
            {...register('avatar')}
            type='file'
            accept='image/png, image/jpeg'
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          <input
            {...register('name')}
            type='text'
            placeholder='Name'
            defaultValue={data?.user?.name}
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          {errors.name && (
            <p className='text-red-500 text-sm text-left'>
              {errors.name.message}
            </p>
          )}
          <input
            {...register('lastName')}
            type='text'
            placeholder='Last Name'
            defaultValue={data?.user?.lastName}
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          {errors.lastName && (
            <p className='text-red-500 text-sm'>{errors.lastName.message}</p>
          )}
          <input
            {...register('email')}
            type='email'
            placeholder='Email'
            className='px-4 py-2 rounded-md border border-gray-300'
            defaultValue={data?.user?.email}
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
          <input
            {...register('location')}
            type='text'
            placeholder='Location'
            className='px-4 py-2 rounded-md border border-gray-300'
            defaultValue={data?.user?.location}
          />
          {errors.location && (
            <p className='text-red-500 text-sm'>{errors.location.message}</p>
          )}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='disabled:bg-gray-500'
            size={'lg'}
          >
            {isSubmitting ? 'Loading....' : 'Submit'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
