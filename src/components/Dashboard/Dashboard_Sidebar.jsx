import {
  UserRound,
  PlusCircle,
  ClipboardList,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const organizerItems = [
  {
    title: "Organizer Profile",
    url: "/dashboard/organizer-profile",
    icon: UserRound,
  },
  {
    title: "Add A Camp",
    url: "/dashboard/add-camp",
    icon: PlusCircle,
  },
  {
    title: "Manage Camps",
    url: "/dashboard/manage-camps",
    icon: ClipboardList,
  },
  {
    title: "Registered Camps",
    url: "/dashboard/registered-camps",
    icon: UsersRound,
  },
];
const participantItems = [
  {
    title: "Participant Profile",
    url: "/dashboard/participant-profile",
    icon: UserRound,
  },
  {
    title: "Registered Camps",
    url: "/dashboard/registered-camps",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: UsersRound,
  },
  {
    title: "Payment History",
    url: "/dashboard/payment-history",
    icon: ClipboardList,
  }
];
const DashboardSidebar = () => {
  return (
    <Sidebar className="border-r bg-background">
      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Organizer
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {organizerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;