import Panel from '@/stories/settings/panel';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: Layout,
});

export default function Layout() {
  return (
    <div className="flex h-screen p-2" data-tauri-drag-region={true}>
      <Panel className="w-1/6 min-w-36" />
      <hr />
      <div
        className="m-2 flex grow flex-col items-center"
        data-tauri-drag-region={true}
      >
        <div
          className="flex w-1/2 flex-col items-center gap-4"
          data-tauri-drag-region={true}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
