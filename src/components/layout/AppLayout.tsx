
import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

export function AppLayout() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/orders":
        return "Orders";
      case "/menu":
        return "Menu Management";
      case "/analytics":
        return "Analytics";
      case "/profile":
        return "Profile";
      case "/settings":
        return "Settings";
      default:
        if (location.pathname.startsWith("/orders/")) {
          return "Order Details";
        }
        return "Order Up Vendor Hub";
    }
  };

  const toggleMobileSidebar = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className={`md:block ${mobileNavOpen ? "block" : "hidden"} z-30`}>
          <AppSidebar />
        </div>
        <div
          className={`fixed inset-0 bg-black/50 md:hidden ${
            mobileNavOpen ? "block" : "hidden"
          }`}
          onClick={toggleMobileSidebar}
        ></div>
        <div className="flex-1 flex flex-col">
          <AppHeader title={getPageTitle()} toggleMobileSidebar={toggleMobileSidebar} />
          <main className="flex-1 bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
