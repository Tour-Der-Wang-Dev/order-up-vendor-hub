
import { BarChart2, ChefHat, ShoppingBag, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { SalesChart } from "@/components/dashboard/SalesChart";

const Dashboard = () => {
  // This would typically come from an API
  const stats = [
    {
      title: "Total Orders Today",
      value: "28",
      icon: <ShoppingBag />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Today's Revenue",
      value: "฿8,450",
      icon: <TrendingUp />,
      trend: { value: 8.5, isPositive: true },
    },
    {
      title: "Active Menu Items",
      value: "42",
      icon: <ChefHat />,
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Avg. Order Value",
      value: "฿302",
      icon: <BarChart2 />,
      trend: { value: 3.2, isPositive: true },
    },
  ];

  const recentOrders = [
    {
      id: "ORD123",
      customerName: "Somchai K.",
      total: 450,
      status: "new",
      items: 3,
      createdAt: new Date(),
    },
    {
      id: "ORD122",
      customerName: "Wanida S.",
      total: 280,
      status: "processing",
      items: 2,
      createdAt: new Date(Date.now() - 30 * 60000),
    },
    {
      id: "ORD121",
      customerName: "Nattapong P.",
      total: 720,
      status: "ready",
      items: 4,
      createdAt: new Date(Date.now() - 60 * 60000),
    },
    {
      id: "ORD120",
      customerName: "Apinya L.",
      total: 350,
      status: "completed",
      items: 2,
      createdAt: new Date(Date.now() - 2 * 60 * 60000),
    },
  ];

  const salesData = [
    { name: "Mon", amount: 4000 },
    { name: "Tue", amount: 3000 },
    { name: "Wed", amount: 5000 },
    { name: "Thu", amount: 7000 },
    { name: "Fri", amount: 6000 },
    { name: "Sat", amount: 8000 },
    { name: "Sun", amount: 9000 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <RecentOrdersTable orders={recentOrders as any} />
        </div>
        
        <SalesChart data={salesData} />
      </div>
    </div>
  );
};

export default Dashboard;
