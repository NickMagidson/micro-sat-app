import { ArrowRightLeftIcon, Calendar, ChartNoAxesCombinedIcon, ChartPieIcon, ChartSplineIcon, ClipboardListIcon, Clock9Icon, CrownIcon, HashIcon, Home, Inbox, Search, Settings, UsersIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
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
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartNoAxesCombinedIcon />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>5</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
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
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
  )
}