'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TcreateJobSchema, createJobSchema } from '@/types';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useState } from 'react';
import { customRevalidateTag } from '@/lib/action';
import { API } from '@/config';

const AddJobForm = ({ token }: { token: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TcreateJobSchema>({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (values: TcreateJobSchema) => {
    const response = await API.POST(`/jobs`, values, token);

    if (response.msg === 'SUCCESS') {
      toast.success('Successfully add job');
      await customRevalidateTag('/dashboard/jobs');
      setOpen(false);
      reset();
      return response;
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={'lg'} className='w-[236px] lg:w-auto'>
          Add Job
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Job</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-4 mt-4'
        >
          <input
            {...register('company')}
            type='text'
            placeholder='Company'
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          {errors.company && (
            <p className='text-red-500 text-sm text-left'>
              {errors.company.message}
            </p>
          )}
          <input
            {...register('position')}
            type='text'
            placeholder='Position'
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          {errors.position && (
            <p className='text-red-500 text-sm'>{errors.position.message}</p>
          )}
          <input
            {...register('jobLocation')}
            type='text'
            placeholder='Job location'
            className='px-4 py-2 rounded-md border border-gray-300'
          />
          {errors.jobLocation && (
            <p className='text-red-500 text-sm'>{errors.jobLocation.message}</p>
          )}
          <select
            {...register('jobType')}
            className='px-4 py-2 rounded-md border border-gray-300'
          >
            <option value='full-time'>Full-time</option>
            <option value='part-time'>Part-time</option>
            <option value='internship'>Internship</option>
          </select>
          <select
            {...register('jobStatus')}
            className='px-4 py-2 rounded-md border border-gray-300'
          >
            <option value='pending'>Pending</option>
            <option value='interview'>Interview</option>
            <option value='declined'>Declined</option>
          </select>
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

export default AddJobForm;
