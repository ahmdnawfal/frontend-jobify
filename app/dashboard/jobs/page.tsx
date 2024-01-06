import AddJobForm from '@/components/add-job';
import DeleteJob from '@/components/delete-job';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import UpdateJob from '@/components/update-job';
import { Tjobs } from '@/types';
import { IoLocationOutline, IoCalendarOutline } from 'react-icons/io5';
import { PiBagDuotone } from 'react-icons/pi';
import dayjs from 'dayjs';
import { API } from '@/config';
import Pagination from '@/components/pagination';
import Search from '@/components/search';

import { Metadata } from 'next';
import FilterSelect from '@/components/filter-select';
import { JOB_SORT, JOB_STATUS, JOB_TYPE } from '@/lib/constants';
import { cookies } from 'next/headers';
import RefreshToken from '@/components/refresh-token';

export const metadata: Metadata = {
  title: 'Jobs - Jobify',
  description: 'Jobs - Jobify',
};

type PropsJobs = {
  searchParams?: {
    page?: string;
    search?: string;
    sort?: string;
    jobStatus?: string;
    jobType?: string;
  };
};

type params = {
  page?: string;
  search?: string;
  sort?: string;
  jobStatus?: string;
  jobType?: string;
};

const getJobs = async (token: string, params?: params) => {
  const response = await API.GET('/jobs', token, params);

  if (response.msg === 'SUCCESS') {
    return response;
  } else {
    return response;
  }
};

const Page = async ({ searchParams }: PropsJobs) => {
  const cookie = cookies();
  const token = cookie.get('access_token')?.value;

  const params = {
    page: searchParams?.page || '1',
    search: searchParams?.search || '',
    sort: searchParams?.sort || 'newest',
    jobStatus: searchParams?.jobStatus || 'all',
    jobType: searchParams?.jobType || 'all',
  };

  const data = await getJobs(token ?? '', params);

  if (data.msg === 'authentication invalid') {
    return <RefreshToken />;
  }

  return (
    <div className='px-2 flex flex-col gap-4'>
      <div className='flex flex-col lg:flex-col xl:flex-row justify-between items-center gap-4'>
        <div>
          <Search />
        </div>
        <div className='flex flex-col xl:flex-row gap-4 '>
          <FilterSelect
            name='jobStatus'
            options={JOB_STATUS}
            placeholder='Job status'
            defaultValue={searchParams?.jobStatus || 'all'}
          />
          <FilterSelect
            name='jobType'
            options={JOB_TYPE}
            placeholder='Job type'
            defaultValue={searchParams?.jobType || 'all'}
          />
          <FilterSelect
            name='sort'
            options={JOB_SORT}
            placeholder='Sort by'
            defaultValue={searchParams?.sort || 'newest'}
          />
          <AddJobForm token={token ?? ''} />
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-xl md:text-2xl text-center md:text-left text-gray-600 font-bold'>
          {data?.count < 1 && 'No Jobs Found'}
          {data?.count > 0 && ` ${data?.count?.toLocaleString()} Jobs Found`}
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data?.rows?.map((value: Tjobs) => (
          <Card key={value._id}>
            <CardContent>
              <div className='flex flex-col'>
                <div className='flex items-center gap-4 mt-5'>
                  <p className='py-4 px-6 bg-[#2cb1bc] text-white font-bold rounded-md'>
                    {value?.company?.charAt(0)}
                  </p>
                  <div className='flex flex-col'>
                    <p className='text-gray-500 font-bold'>{value?.position}</p>
                    <p className='text-gray-400'>{value?.company}</p>
                  </div>
                </div>
                <div className='w-full border border-gray-500 mt-4' />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 mt-4 gap-4'>
                  <div className='flex flex-row items-center gap-2'>
                    <IoLocationOutline className='text-lg' />
                    <p>{value?.jobLocation}</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <IoCalendarOutline className='text-lg' />
                    <p>{dayjs(value?.createdAt).format('DD MMM, YYYY')}</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <PiBagDuotone className='text-lg' />
                    <p>{value?.jobType}</p>
                  </div>
                  <div>
                    {value?.jobStatus === 'pending' && (
                      <Badge variant='default'>Pending</Badge>
                    )}
                    {value?.jobStatus === 'declined' && (
                      <Badge variant='declined'>Declined</Badge>
                    )}
                    {value?.jobStatus === 'interview' && (
                      <Badge variant='interview'>Interview</Badge>
                    )}
                  </div>
                </div>
                <div className='flex gap-4 mt-4'>
                  <UpdateJob _id={value._id} token={token ?? ''} />
                  <DeleteJob _id={value._id} token={token ?? ''} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Pagination count={data?.count} limit={data?.limit} />
      </div>
    </div>
  );
};

export default Page;
