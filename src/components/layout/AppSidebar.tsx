
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  ChefHat,
  Settings,
  User,
  LogOut,
  ShoppingBag,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function AppSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      path: "/orders",
    },
    {
      title: "Menu",
      icon: ChefHat,
      path: "/menu",
    },
    {
      title: "Analytics",
      icon: BarChart2,
      path: "/analytics",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar
      className="border-r border-gray-200 min-h-screen"
      onCollapsedChange={setIsCollapsed}
    >
      <SidebarHeader className="py-4">
        <div className="flex items-center justify-center">
          {isCollapsed ? (
            <div className="w-8 h-8 rounded-full bg-vendor-orange flex items-center justify-center">
              <span className="text-white font-bold text-sm">TD</span>
            </div>
          ) : (
            <div className="flex items-center">
              <img
                src="/lovable-uploads/90494f25-3cb7-4324-84b1-ae6a73fe364b.png"
                alt="Tour Der Wang"
                className="h-10"
              />
              <div className="ml-2 text-lg font-bold text-vendor-orange">OrderUp</div>
            </div>
          )}
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="my-1">
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`w-full ${isActive(item.path) ? "bg-orange-100 text-vendor-orange font-medium" : ""}`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-between items-center px-4 py-2">
          {!isCollapsed && (
            <div className="flex items-center flex-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-vendor-orange text-white">TW</AvatarFallback>
              </Avatar>
              <div className="ml-2 text-sm">
                <p className="font-medium">Tour Der Wang</p>
                <p className="text-xs text-gray-500">Restaurant Owner</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-vendor-orange"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
