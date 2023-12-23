'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import { customRevalidateTag } from '@/lib/action';
import { API } from '@/config';

const DeleteJob = ({ _id, token }: { _id: string; token: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await API.DELETE(`/jobs/${id}`, token);

    if (response.msg === 'SUCCESS') {
      toast.success('Successfully edit job');
      await customRevalidateTag('/dashboard/jobs');
    } else {
      toast.error(response.msg);
    }
    setIsLoading(false);
  };

  return (
    <Button variant={'destructive'} onClick={() => handleDelete(_id)}>
      {isLoading ? 'Loading...' : 'Delete'}
    </Button>
  );
};

export default DeleteJob;
