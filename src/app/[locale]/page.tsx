import MainPanel from '@/stories/panels/main-panel';
import Commit from './ui/main/commit';
import Control from './ui/main/control';

export default function Page() {
  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      <Control />
      <MainPanel />
      <Commit />
    </div>
  );
}
