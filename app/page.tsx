'use client';

import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import Live from '@/components/Live';
import RightSideBar from '@/components/RightSideBar';
import {
  handleCanvasMouseDown,
  handleCanvaseMouseMove,
  handleResize,
  initializeFabric,
} from '@/lib/canvas';
import { ActiveElement } from '@/types/type';
import LeftSideBar from '@/components/LeftSidebar';
import NavBar from '@/components/Navbar';
import { useMutation, useStorage } from '@/liveblocks.config';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    
    const canvasObjects = storage.get('canvasObjects');
    canvasObjects.set(objectId, shapeData)
  }, []);

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

    canvas.on('mouse:move', (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage
      });
    });

    window.addEventListener('resize', () => {
      handleResize({ canvas: fabricRef.current });
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
