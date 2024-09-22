export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen" data-tauri-drag-region={true}>
            {children}
        </div>
    );
}
