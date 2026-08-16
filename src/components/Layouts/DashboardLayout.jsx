import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import DashboardSidebar from "../Dashboard/Dashboard_Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full p-4">
          {/* Adds a button to collapse/expand the sidebar */}
          <SidebarTrigger />

          {/* Renders your page content */}
          {children}
        </main>
      </SidebarProvider>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
