'use client'
import { ChevronDown, Satellite } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

const satelliteOperations = [
  {
    title: "Single TLE Processor",
    url: "/tle-processor",
  },
  {
    title: "Batch Analysis",
    url: "/batch-analysis",
  }
]

export function AppSidebar() {
const pathname = usePathname()

  return (
    // <Sidebar>
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Application</SidebarGroupLabel>
    //       <SidebarGroupContent>
    //         <SidebarMenu>
    //           {items.map((item) => (
    //             <SidebarMenuItem key={item.title}>
    //               <SidebarMenuButton asChild>
    //                 <a href={item.url}>
    //                   <item.icon />
    //                   <span>{item.title}</span>
    //                 </a>
    //               </SidebarMenuButton>
    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>
    // </Sidebar>
        <Sidebar className="z-30">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='/'>
                        {/* <ChartNoAxesCombinedIcon /> */}
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              {/* <SidebarGroupLabel>Management</SidebarGroupLabel> */}
              <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Satellite size={44} color="#ffffff" strokeWidth={1.25} />
                    <span>Satellite Operations</span>
                    <ChevronDown className="ml-auto transition-transform -rotate-90 group-data-[state=open]/collapsible:rotate-0" />
                  </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton asChild isActive={pathname === "/tle-processor"} >
                        <Link href="/tle-processor">
                          <span>Single TLE Processor</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton asChild isActive={pathname === "/batch-analysis"}>
                        <Link href="/batch-analysis">
                          <span>Batch Analysis</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    {/* <SidebarMenuSubItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <span>Privacy Controls</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem> */}
                  </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>


            {/* <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartSplineIcon />
                        <span>Content Performance</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <UsersIcon />
                        <span>Audience Insight</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartPieIcon />
                        <span>Engagement Metrics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <HashIcon />
                        <span>Hashtag Performance</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>3</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ArrowRightLeftIcon />
                        <span>Competitor Analysis</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <Clock9Icon />
                        <span>Campaign Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ClipboardListIcon />
                        <span>Sentiment Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <CrownIcon />
                        <span>Influencer</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup> */}
          </SidebarContent>
        </Sidebar>
  )
}