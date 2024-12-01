'use client';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen" data-tauri-drag-region={true}>
      {children}
    </div>
  );
}
