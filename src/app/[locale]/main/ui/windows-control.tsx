'use client';

import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState } from 'react';

export function Win32Control() {
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaxized] = useState(false);

  appWindow.isMaximized().then(v => setIsMaxized(v));

  return (
    <div className="fixed top-0 right-0 flex flex-row">
      <button
        type="button"
        id="decorum-tb-minimize"
        className="decorum-tb-btn bg-background/50"
        onClick={() => {
          appWindow.minimize();
        }}
      >
        
      </button>
      <button
        type="button"
        id="decorum-tb-maximize"
        className="decorum-tb-btn"
        onClick={() => {
          appWindow.toggleMaximize();
        }}
      >
        {isMaximized ? '' : ''}
      </button>
      <button
        type="button"
        id="decorum-tb-close"
        className="decorum-tb-btn"
        onClick={() => {
          appWindow.close();
        }}
      >
        
      </button>
    </div>
  );
}
