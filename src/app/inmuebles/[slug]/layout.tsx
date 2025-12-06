import PropertyPageProvider from "@/providers/PropertyProvider";

export default function PropertyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PropertyPageProvider>{children}</PropertyPageProvider>
    </>
  );
}
