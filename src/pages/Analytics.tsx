
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ArrowDownRight, ArrowUpRight, BarChart2, Calendar, Utensils } from "lucide-react";

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("week");

  // Mock data - would typically come from an API
  const salesData = [
    { name: "Mon", amount: 4000 },
    { name: "Tue", amount: 3000 },
    { name: "Wed", amount: 5000 },
    { name: "Thu", amount: 7000 },
    { name: "Fri", amount: 6000 },
    { name: "Sat", amount: 8000 },
    { name: "Sun", amount: 9000 },
  ];

  const orderStats = [
    {
      title: "Total Orders",
      value: "196",
      icon: <Utensils />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Revenue",
      value: "฿59,450",
      icon: <BarChart2 />,
      trend: { value: 8.5, isPositive: true },
    },
    {
      title: "Avg. Order Value",
      value: "฿302",
      icon: <ArrowUpRight />,
      trend: { value: 3.2, isPositive: true },
    },
    {
      title: "Cancelled Orders",
      value: "5",
      icon: <ArrowDownRight />,
      trend: { value: 1.8, isPositive: false },
    },
  ];

  const topSellingItems = [
    { name: "Pad Thai", value: 48 },
    { name: "Green Curry", value: 32 },
    { name: "Tom Yum Goong", value: 28 },
    { name: "Spring Rolls", value: 22 },
    { name: "Mango Sticky Rice", value: 20 },
  ];

  const COLORS = ["#F97316", "#FDBA74", "#FFEDD5", "#FEF3C7", "#FEF9C3"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="items">Popular Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`฿${value}`, 'Sales']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#F97316"
                      strokeWidth={3}
                      dot={{ r: 6, fill: "#F97316", strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value, 'Orders']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="amount" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topSellingItems}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {topSellingItems.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [value, name]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
