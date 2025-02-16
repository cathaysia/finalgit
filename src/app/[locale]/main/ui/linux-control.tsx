'use client';

import { cn } from '@/lib/utils';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { BiExpandAlt } from 'react-icons/bi';
import { FaRegWindowMaximize, FaRegWindowMinimize } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

export function LinuxControl() {
  const [isMaximized, setIsMaxized] = useState(false);

  useEffect(() => {
    getCurrentWindow().onResized(async () => {
      setIsMaxized(await getCurrentWindow().isMaximized());
    });
  }, []);

  return (
    <div className="flex flex-row gap-2">
      <button
        type="button"
        id="decorum-tb-close"
        onClick={() => {
          getCurrentWindow().close();
        }}
        className={cn(
          'decorum-tb-btn m-0 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:active:bg-[#565656] dark:hover:bg-[#424242]',
          'pl-1',
        )}
      >
        <IoClose className="h-4 w-4" />
      </button>
      <button
        type="button"
        id="decorum-tb-minimize"
        className={cn(
          'decorum-tb-btn m-0 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:active:bg-[#565656] dark:hover:bg-[#424242]',
          'flex pl-1.5',
        )}
      >
        <FaRegWindowMinimize className="h-3 w-3" />
      </button>
      <button
        type="button"
        id="decorum-tb-maximize"
        onClick={async () => {
          await getCurrentWindow().toggleMaximize();
          const isMaximized = await getCurrentWindow().isMaximized();
          setIsMaxized(isMaximized);
          console.log(isMaximized);
        }}
        className={cn(
          'decorum-tb-btn m-0 aspect-square h-6 w-6 cursor-default rounded-full bg-[#dadada] p-0 text-[#3d3d3d] hover:bg-[#d1d1d1] active:bg-[#bfbfbf] dark:bg-[#373737] dark:text-white dark:active:bg-[#565656] dark:hover:bg-[#424242]',
          'pl-1.5',
        )}
      >
        {!isMaximized ? (
          <BiExpandAlt className="h-3 w-3" />
        ) : (
          <FaRegWindowMaximize className="h-3 w-3" />
        )}
      </button>
    </div>
  );
}
