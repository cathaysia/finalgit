'use client';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-screen w-screen grid-cols-4 gap-2">{children}</div>
  );
}
