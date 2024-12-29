import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import TopBar from "./topbar";

export default function RootLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <TopBar />
          <div className="container  mx-auto flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mt-14">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
