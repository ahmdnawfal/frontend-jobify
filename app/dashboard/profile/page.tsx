import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RxAvatar } from 'react-icons/rx';
import { Metadata } from 'next';
import Image from 'next/image';
import { API } from '@/config';
import RefreshToken from '@/components/refresh-token';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Profile - Jobify',
  description: 'Profile - Jobify',
};

const getProfile = async (token: string) => {
  const response = await API.GET('/users/profile', token);

  return response;
};

const Page = async () => {
  const cookie = cookies();
  const token = cookie.get('access_token')?.value;

  const data = await getProfile(token ?? '');

  if (data.msg === 'authentication invalid') {
    return <RefreshToken />;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <div className='mt-5 flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
              <div>
                {data?.user?.avatar ? (
                  <Image
                    src={data?.user.avatar}
                    alt='avatar'
                    width={150}
                    height={150}
                    className='rounded-md'
                    style={{ objectFit: 'cover', height: 150 }}
                  />
                ) : (
                  <RxAvatar className='text-5xl' />
                )}
              </div>
              {/* <EditProfile data={data} token={session?.token ?? ''} /> */}
            </div>
            <div className='flex flex-col gap-2 text-gray-500'>
              <div className='flex flex-col md:grid md:grid-cols-2'>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
                  Name:
                </p>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis text-black'>
                  {data?.user?.name}
                </p>
              </div>
              <div className='flex flex-col md:grid md:grid-cols-2'>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
                  Last Name:
                </p>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis text-black'>
                  {data?.user?.lastName}
                </p>
              </div>
              <div className='flex flex-col md:grid md:grid-cols-2'>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
                  Email:
                </p>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis text-black'>
                  {data?.user?.email}
                </p>
              </div>
              <div className='flex flex-col md:grid md:grid-cols-2'>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
                  Location:
                </p>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis text-black'>
                  {data?.user?.location}
                </p>
              </div>
              <div className='flex flex-col md:grid md:grid-cols-2'>
                <p className='whitespace-nowrap w-full overflow-hidden text-ellipsis'>
                  Role:
                </p>
                <Badge className='w-max'>{data?.user?.role}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
