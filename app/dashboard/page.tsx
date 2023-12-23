import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiUsersThreeLight } from 'react-icons/pi';
import { BsPersonWorkspace } from 'react-icons/bs';
import Carts from '@/components/carts';
import useAuthSession from '@/lib/useAuthSession';
import { API } from '@/config';

const getDataStatsAdmin = async (token: string) => {
  const response = await API.GET(`/users/admin/app-stats`, token);

  if (response.msg === 'SUCCESS') {
    return response;
  } else {
    throw new Error(response.msg);
  }
};

// const getDataStats = async (token: string) => {
//   const response = await API.GET(`/jobs/stats`, token);

//   if (response.msg === 'SUCCESS') {
//     return response;
//   } else {
//     throw new Error(response.msg);
//   }
// };

const Page = async () => {
  const session = await useAuthSession();

  if (session?.role === 'user') {
    return (
      <div className='w-full h-[550px] mt-8'>
        <Carts />
      </div>
    );
  }

  const dataStatsAdmin = await getDataStatsAdmin(session?.token ?? '');

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex gap-6 items-center'>
              <PiUsersThreeLight className='text-4xl' />
              <p className='text-lg'>
                {dataStatsAdmin?.users.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex gap-6 items-center'>
              <BsPersonWorkspace className='text-4xl' />
              <p className='text-lg'>{dataStatsAdmin?.jobs.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='w-full h-[550px] mt-8'>
        <Carts />
      </div>
    </div>
  );
};

export default Page;
