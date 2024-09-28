import { Nav } from '@/components/Nav';
import { MdHome } from 'react-icons/md';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex" data-tauri-drag-region={true}>
      <div className="flex flex-col gap-2 w-52">
        <Nav to="/" text={<MdHome />} />
      </div>
      <div>{children}</div>
    </div>
  );
}
