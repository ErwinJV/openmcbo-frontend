import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14161a",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://openmcbo.netlify.app",
  ), // Reemplaza con tu dominio real
  title: "Open Maracaibo",
  description: "Open Maracaibo - Tu plataforma de bienes raíces",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Open Maracaibo",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes", // Para compatibilidad extra con Android/Chrome antiguo
  },
  openGraph: {
    type: "website",
    title: "Open Maracaibo",
    description: "Open Maracaibo - Tu plataforma de bienes raíces",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Maracaibo logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Maracaibo",
    description: "Open Maracaibo - Tu plataforma de bienes raíces",
    images: ["/og-image.png"],
  },
};

export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative `}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
