import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/filetree')({
  component: () => {
    return (
      <div className="h-screen w-screen" data-tauri-drag-region={true}>
        <Outlet />
      </div>
    );
  },
});
