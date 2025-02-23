
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-8xl bg-neutral-800">
      {children}
    </div>
  );
}