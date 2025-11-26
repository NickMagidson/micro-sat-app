import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
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
          <div className='flex min-h-dvh w-full'>
            <div className='flex flex-1 flex-col'>
              <header className='bg-card sticky top-0 z-50 border-b'>
                <div className=' flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                  <div className='flex items-center gap-4'>
                    <SidebarTrigger className='[&_svg]:!size-5' />
                    <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                    {/* <Breadcrumb className='hidden sm:block'>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Free</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb> */}
                  </div>
                  {/* <div className='flex items-center gap-1.5'>
                    <LanguageDropdown
                      trigger={
                        <Button variant='ghost' size='icon'>
                          <LanguagesIcon />
                        </Button>
                      }
                    />
                    <ProfileDropdown
                      trigger={
                        <Button variant='ghost' size='icon' className='size-9.5'>
                          <Avatar className='size-9 rounded-md'>
                            <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </Button>
                      }
                    />
                  </div> */}
                </div>
              </header>
              <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:mx-8 lg:max-w-[98%]'>
                {children}
              </main>
              <footer className='bg-card h-10 border-t'>
                <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
                  <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
                </div>
              </footer>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}