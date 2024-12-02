export default function RootLayout({
  children,
  control,
  commit,
}: Readonly<{
  children: React.ReactNode;
  control: React.ReactNode;
  commit: React.ReactNode;
}>) {
  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      {control}
      {children}
      {commit}
    </div>
  );
}
