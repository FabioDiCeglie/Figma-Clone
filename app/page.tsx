'use client';

import fabric from 'fabric';
import { useEffect, useRef } from 'react';
import LeftSideBar from '@/components/LeftSideBar';
import Live from '@/components/Live';
import NavBar from '@/components/NavBar';
import RightSideBar from '@/components/RightSideBar';
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      });
    });

    window.addEventListener('resize', () => {
      handleResize({ fabricRef })
    })
  }, []);

  return (
    <main className='h-screen overflow-hidden'>
      <NavBar />

      <section className='flex h-full flex-row'>
        <LeftSideBar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>
    </main>
  );
}
