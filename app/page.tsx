'use client';

import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import Live from '@/components/Live';
import RightSideBar from '@/components/RightSideBar';
import {
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
} from '@/lib/canvas';
import { ActiveElement } from '@/types/type';
import LeftSideBar from '@/components/LeftSidebar';
import NavBar from '@/components/Navbar';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: '',
  });

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    selectedShapeRef.current = elem?.value as string;
  };

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
      handleResize({ canvas: fabricRef.current })
    });
  }, []);

  return (
    <main className='h-screen overflow-hidden'>
      <NavBar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className='flex h-full flex-row'>
        <LeftSideBar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>
    </main>
  );
}
