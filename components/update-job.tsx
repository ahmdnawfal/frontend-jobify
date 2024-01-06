'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { TcreateJobSchema, createJobSchema } from '@/types';
import { toast } from 'react-toastify';
import { customRevalidateTag } from '@/lib/action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import { API } from '@/config';
import { refreshTokenHandler } from '@/config/refreshToken';

const UpdateJob = ({ _id, token }: { _id: string; token: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [jobId, setJobId] = useState<string>('');

  const handleChange = async (id: string) => {
    setIsLoading(true);

    const response = await API.GET(`/jobs/${id}`, token);
    if (response.msg === 'SUCCESS') {
      setData(response);
    } else if (response.msg === 'authentication invalid') {
      const refreshToken = refreshTokenHandler();
      toast.info(refreshToken.msg);
    } else {
      toast.error(response.msg);
    }

    setOpen(true);
    setJobId(id);
    setIsLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TcreateJobSchema>({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (values: TcreateJobSchema) => {
    const response = await API.PATCH(`/jobs/${jobId}`, values, token);

    if (response.msg === 'SUCCESS') {
      toast.success('Successfully edit job');
      await customRevalidateTag('/dashboard/jobs');
      setOpen(false);
    } else if (response.msg === 'authentication invalid') {
      const refreshToken = refreshTokenHandler();
      toast.info(refreshToken.msg);
    } else {
      toast.error(response.msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant='secondary' onClick={() => handleChange(_id)}>
        Edit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-4 mt-4'
          >
            <input
              {...register('company')}
              type='text'
              placeholder='Company'
              className='px-4 py-2 rounded-md border border-gray-300'
              defaultValue={data?.rows?.company}
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
              defaultValue={data?.rows?.position}
            />
            {errors.position && (
              <p className='text-red-500 text-sm'>{errors.position.message}</p>
            )}
            <input
              {...register('jobLocation')}
              type='text'
              placeholder='Job location'
              className='px-4 py-2 rounded-md border border-gray-300'
              defaultValue={data?.rows?.jobLocation}
            />
            {errors.jobLocation && (
              <p className='text-red-500 text-sm'>
                {errors.jobLocation.message}
              </p>
            )}
            <select
              {...register('jobType')}
              defaultValue={data?.rows?.jobType}
              className='px-4 py-2 rounded-md border border-gray-300'
            >
              <option value='full-time'>Full-time</option>
              <option value='part-time'>Part-time</option>
              <option value='internship'>Internship</option>
            </select>
            <select
              {...register('jobStatus')}
              defaultValue={data?.rows?.jobStatus}
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJob;
