'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { AiOutlineBarChart } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { RiUserLine } from 'react-icons/ri';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: AiOutlineBarChart },
  {
    name: 'Jobs',
    href: '/dashboard/jobs',
    icon: HiOutlineShoppingBag,
  },
  { name: 'Profile', href: '/dashboard/profile', icon: RiUserLine },
];

export default function Navlinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className='text-lg' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
