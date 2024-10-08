import { Nav } from '@/components/Nav';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { MdHome } from 'react-icons/md';

export const Route = createFileRoute('/diff')({
  component: () => {
    return (
      <div className="flex h-screen w-screen" data-tauri-drag-region={true}>
        <div className="flex w-52 flex-col gap-2">
          <Nav to="/" text={<MdHome />} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  },
});
