import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiUsersThreeLight } from 'react-icons/pi';
import { BsPersonWorkspace } from 'react-icons/bs';
import Carts from '@/components/carts';

const Page = async () => {
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
              <p className='text-lg'></p>
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
