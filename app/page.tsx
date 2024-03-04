'use client';

import LeftSideBar from '@/components/LeftSideBar';
import Live from '@/components/Live';
import NavBar from '@/components/NavBar';
import RightSideBar from '@/components/RightSideBar';

export default function Page() {
  return (
    <main className='h-screen overflow-hidden'>
      <NavBar />
      
      <section className='flex h-full flex-row'>
        <LeftSideBar />
        <Live />
        <RightSideBar />
      </section>
    </main>
  );
}
