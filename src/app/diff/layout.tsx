import { Nav } from '@/components/Nav';
import { MdHome } from 'react-icons/md';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen" data-tauri-drag-region={true}>
      <div className="flex w-52 flex-col gap-2">
        <Nav to="/" text={<MdHome />} />
      </div>
      <div>{children}</div>
    </div>
  );
}
