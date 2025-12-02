import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Micro Sat App",
  description: "A simplified satellite application to learn about space software development",
  openGraph: {
    type: "website",
    siteName: "Micro Sat App",
    title: "Micro Sat App",
    url: `https://nextjs-cesium.vercel.app`,
    description: "A simplified satellite application to learn about space software development",
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
        <div className='flex w-full'>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className='bg-card fixed top-0 left-0 right-0 z-8 border-b'>
                <div className=' flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6 ml-[var(--sidebar-width)] group-data-[state=collapsed]:ml-[var(--sidebar-width-icon)]'>
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
              <main className='mx-auto size-full max-w-7xl p-7 sm:px-6 lg:mx-8 lg:max-w-[98%] pt-[60px]'>
                {children}
              </main>
              <footer className='bg-card h-10 border-t'>
                <div className='mx-auto flex-row items-center size-full max-w-7xl px-4 sm:px-6'>
                  <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
                    {/* <p className="mx-auto text-center">Created by <a href="https://github.com/nickmagidson">Nick Magidson</a></p> */}

                </div>
              </footer>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}