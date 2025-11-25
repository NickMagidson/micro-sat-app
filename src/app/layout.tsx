import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cesium in Next.js 14 with TypeScript",
  description: "An example Next.js 14 TypeScript project displaying Cesium hosted in Vercel",
  openGraph: {
    type: "website",
    siteName: "Cesium in Next.js 14 with TypeScript",
    title: "Cesium in Next.js 14 with TypeScript",
    url: `https://nextjs-cesium.vercel.app`,
    description: "An example Next.js 14 TypeScript project displaying Cesium hosted in Vercel",
    images: [{
      url: `https://nextjs-cesium.vercel.app/og.png`
    }]
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased `}
      >
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}