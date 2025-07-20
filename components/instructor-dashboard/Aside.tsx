import Link from "next/link";
import Icon from "../ui/Icon";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const Aside = () => {
  const links = [
    { icon: "ph:chart-bar", name: "Dashboard", href: "/instructor/dashboard" },
    {
      icon: "ph:plus-circle",
      name: "Create New Course",
      href: "/instructor/dashboard/create-course",
    },
    {
      icon: "ph:stack",
      name: "My Courses",
      href: "/instructor/dashboard/my-courses",
    },
    {
      icon: "ph:credit-card",
      name: "Earning",
      href: "/instructor/dashboard/earning",
    },
    {
      icon: "ph:chat-circle-dots",
      name: "Message",
      href: "/instructor/dashboard/message",
    },
    {
      icon: "ph:gear",
      name: "Settings",
      href: "/instructor/dashboard/settings",
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent className="bg-neutral">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link
              href="/instructor/dashboard"
              className="flex items-center gap-2"
            >
              <Icon
                icon="ph:graduation-cap"
                width="32"
                height="32"
                className="text-primary"
              />
              <h1 className="text-base-100 text-3xl font-bold">E-tutor</h1>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8">
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={link.href}
                      key={link.name}
                      className="text-base-100/50 flex items-center gap-4 py-6"
                    >
                      <Icon icon={link.icon} width="32" height="32" />
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-neutral">
        <Link
          href=""
          className="text-base-100/50 hover:text-base-100 flex items-center gap-4"
        >
          <Icon icon="ph:sign-out" width="32" height="32" />
          Sign-out
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Aside;
