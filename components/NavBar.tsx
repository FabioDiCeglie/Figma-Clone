'use client';

import Image from 'next/image';
import { memo } from 'react';
import { ActiveElement, NavbarProps } from '@/types/type';
import ActiveUsers from './users/ActiveUsers';
import { navElements } from '@/constants';
import NewThread from './comments/NewThread';

const NavBar = ({ activeElement }: NavbarProps) => {
  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
      <Image src='/assets/logo.svg' alt='Figma logo' width={58} height={20} />

      <ul className='flex flex-row'>
        {navElements.map((item: ActiveElement | any) => (
          <li key={item.name}>
            {Array.isArray(item.value) ? (
              <ShapesMenu />
            ) : item?.value === 'comments' ? (
              <NewThread />
            ) : (
              <button></button>
            )}
          </li>
        ))}
      </ul>
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  NavBar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
