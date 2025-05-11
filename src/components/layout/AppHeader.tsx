
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  toggleMobileSidebar?: () => void;
}

export function AppHeader({ title, toggleMobileSidebar }: AppHeaderProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New order #1234 received",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      message: "Order #1233 is ready for pickup",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 3,
      message: "Customer left a review",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 md:hidden"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 bg-vendor-orange text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full"
                  aria-label={`${unreadCount} unread notifications`}
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex justify-between items-center px-4 py-2">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-vendor-orange"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`px-4 py-3 cursor-default ${
                      !notification.read ? "bg-orange-50" : ""
                    }`}
                    onSelect={() => markAsRead(notification.id)}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">
                        {notification.message}
                      </span>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-center text-gray-500">
                  No notifications
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
