import { Briefcase, FileText, Folder, Swords } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, NavLink } from "react-router";

const items = [
  // {
  //   title: "Home",
  //   url: "/",
  //   icon: Home,
  // },
  {
    title: "Projects",
    url: "projects",
    icon: Folder,
  },
  {
    title: "Blogs",
    url: "blogs",
    icon: FileText,
  },
  {
    title: "Skills",
    url: "skills",
    icon: Swords,
  },
  {
    title: "Experience",
    url: "experiences",
    icon: Briefcase,
  },
  // {
  //   title: "Settings",
  //   url: "settings",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="text-2xl font-bold text-center py-4">
          <div className="flex items-center ">
            <Link to={"/"}>Dashboard</Link>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <NavLink to={item.url} key={item.title}>
                  {({ isActive }) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
