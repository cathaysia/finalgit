'use client';
import { Nav } from '@/components/Nav';
import { useAppState } from '@/lib/state';
import FilePanel from '@/stories/panels/FilePanel';
import { MdHome } from 'react-icons/md';

export default function Layout({ children }: { children: React.ReactNode }) {
    const tree = useAppState(s => s.files);
    return (
        <div className="h-screen flex p-2" data-tauri-drag-region={true}>
            <div className="flex flex-col">
                <Nav to="/" text={<MdHome />} />
                <FilePanel files={tree} />
            </div>
            {children}
        </div>
    );
}
