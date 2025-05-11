
import { useState } from "react";
import { OrdersFilter } from "@/components/orders/OrdersFilter";
import { OrderItem } from "@/components/orders/OrderItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data - would typically come from an API
  const [orders, setOrders] = useState([
    {
      id: "ORD123",
      customerName: "Somchai K.",
      items: [
        { name: "Pad Thai", quantity: 1, price: 150 },
        { name: "Tom Yum Goong", quantity: 1, price: 220 },
        { name: "Rice", quantity: 2, price: 40 },
      ],
      total: 450,
      status: "new",
      createdAt: new Date(),
    },
    {
      id: "ORD122",
      customerName: "Wanida S.",
      items: [
        { name: "Green Curry", quantity: 1, price: 180 },
        { name: "Mango Sticky Rice", quantity: 1, price: 100 },
      ],
      total: 280,
      status: "processing",
      createdAt: new Date(Date.now() - 30 * 60000),
    },
    {
      id: "ORD121",
      customerName: "Nattapong P.",
      items: [
        { name: "Papaya Salad", quantity: 1, price: 120 },
        { name: "Grilled Chicken", quantity: 1, price: 220 },
        { name: "Sticky Rice", quantity: 2, price: 80 },
        { name: "Thai Iced Tea", quantity: 2, price: 120 },
      ],
      total: 540,
      status: "ready",
      createdAt: new Date(Date.now() - 60 * 60000),
    },
    {
      id: "ORD120",
      customerName: "Apinya L.",
      items: [
        { name: "Massaman Curry", quantity: 1, price: 250 },
        { name: "Rice", quantity: 2, price: 80 },
      ],
      total: 330,
      status: "completed",
      createdAt: new Date(Date.now() - 2 * 60 * 60000),
    },
    {
      id: "ORD119",
      customerName: "Chatchai T.",
      items: [
        { name: "Pad See Ew", quantity: 1, price: 140 },
        { name: "Spring Rolls", quantity: 2, price: 160 },
      ],
      total: 300,
      status: "cancelled",
      createdAt: new Date(Date.now() - 3 * 60 * 60000),
    },
  ]);

  const handleStatusChange = (id: string, newStatus: "processing" | "ready" | "completed" | "cancelled") => {
    // Update order status
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    // Show notification
    let message = "";
    switch (newStatus) {
      case "processing":
        message = "Order accepted and being processed";
        break;
      case "ready":
        message = "Order marked as ready for pickup";
        break;
      case "completed":
        message = "Order completed successfully";
        break;
      case "cancelled":
        message = "Order has been cancelled";
        break;
    }

    toast(message, {
      description: `Order #${id} status updated.`,
      duration: 3000,
    });
  };

  // Filter orders by search query and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group orders by status for tabs
  const newOrders = filteredOrders.filter(order => order.status === "new");
  const processingOrders = filteredOrders.filter(order => order.status === "processing");
  const readyOrders = filteredOrders.filter(order => order.status === "ready");
  const completedOrders = filteredOrders.filter(order => order.status === "completed");
  const cancelledOrders = filteredOrders.filter(order => order.status === "cancelled");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      
      <OrdersFilter 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All ({filteredOrders.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            New ({newOrders.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({processingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="ready">
            Ready ({readyOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledOrders.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders found matching your criteria
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          {newOrders.length > 0 ? (
            newOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No new orders at the moment
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="processing" className="mt-0">
          {processingOrders.length > 0 ? (
            processingOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders being processed
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ready" className="mt-0">
          {readyOrders.length > 0 ? (
            readyOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders ready for pickup
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No completed orders
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-0">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                customerName={order.customerName}
                items={order.items}
                total={order.total}
                status={order.status as any}
                createdAt={order.createdAt}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No cancelled orders
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
