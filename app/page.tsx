import Link from 'next/link';
import main from '@/assets/images/main.svg';
import Image from 'next/image';
import useAuthSession from '@/lib/useAuthSession';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await useAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='max-w-5xl px-4 m-auto relative'>
      <nav className='py-5 absolute'>
        <Image
          src={'https://jobify.live/assets/logo-b770cc21.svg'}
          alt='job hunt'
          width={200}
          height={100}
        />
      </nav>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center min-h-screen'>
        <div className='space-y-4'>
          <h1 className='text-3xl md:text-5xl text-gray-800 font-bold'>
            Job <span className='text-[#2cb1bc]'>Tracking</span> App
          </h1>
          <p className='text-gray-500 text-base md:text-lg md:leading-8 mb-5'>
            Applications for job tracking are tools that help individuals or
            teams manage and track the status of ongoing work or projects. Such
            apps provide a wide range of features to organize tasks, monitor
            progress, manage deadlines, collaborate with teams and much more.
          </p>
          <div className='space-x-4'>
            <Link
              href='/register'
              className='bg-[#2cb1bc] p-3 rounded-md hover:bg-green-600 text-white'
            >
              Register
            </Link>
            <Link
              href='/login'
              className='bg-[#2cb1bc] p-3 rounded-md hover:bg-green-600 text-white'
            >
              Login / Demo User
            </Link>
          </div>
        </div>
        <Image
          src={main}
          alt='job hunt'
          width={400}
          height={400}
          className='hidden md:block'
        />
      </div>
    </div>
  );
}
