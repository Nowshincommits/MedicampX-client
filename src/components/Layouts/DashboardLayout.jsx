import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import DashboardSidebar from "../Dashboard/Dashboard_Sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-136px)]">
        <DashboardSidebar />

        <SidebarInset className="min-w-0 flex-1">
          <div className="flex items-center h-14 border-b w-5 px-4">
            <SidebarTrigger />
          </div>

          <main className="p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;