'use client';

import { deleteCookie } from 'cookies-next';
import { PiSignOut } from 'react-icons/pi';

const ButtonLogout = () => {
  const handleLogout = async () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className='flex h-[48px] grow items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
    >
      <PiSignOut className='text-lg' />
      <div className='hidden md:block'>Sign Out</div>
    </button>
  );
};

export default ButtonLogout;
