
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, ChefHat, Clock, MapPin, Phone, Printer, User } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface OrderDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "new" | "processing" | "ready" | "completed" | "cancelled";
  createdAt: Date;
  notes?: string;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // This would typically be fetched from an API
  const [order, setOrder] = useState<OrderDetails>({
    id: id || "unknown",
    customerName: "Somchai Kittiporn",
    customerPhone: "099-123-4567",
    customerAddress: "123 Sukhumvit Rd., Bangkok 10110",
    items: [
      { 
        name: "Pad Thai", 
        quantity: 1, 
        price: 150,
        options: ["No peanuts", "Extra spicy"] 
      },
      { 
        name: "Tom Yum Goong", 
        quantity: 1, 
        price: 220 
      },
      { 
        name: "Rice", 
        quantity: 2, 
        price: 40 
      },
    ],
    subtotal: 410,
    deliveryFee: 40,
    total: 450,
    status: "new",
    createdAt: new Date(),
    notes: "Please include extra napkins and utensils.",
  });

  const getStatusClass = (status: OrderDetails["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-vendor-orange/20 text-vendor-orange";
      case "ready":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };
  
  const getStatusText = (status: OrderDetails["status"]) => {
    switch (status) {
      case "new":
        return "New Order";
      case "processing":
        return "Processing";
      case "ready":
        return "Ready for Pickup";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
    }
  };

  const handleStatusChange = (newStatus: OrderDetails["status"]) => {
    setOrder({ ...order, status: newStatus });
    
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
      description: `Order #${order.id} status updated.`,
    });
  };

  const getStatusActions = () => {
    switch (order.status) {
      case "new":
        return (
          <>
            <Button 
              className="bg-vendor-orange hover:bg-vendor-dark-orange" 
              onClick={() => handleStatusChange("processing")}
            >
              <ChefHat className="mr-2 h-4 w-4" />
              Accept & Start Preparing
            </Button>
            <Button 
              variant="outline" 
              className="text-gray-600"
              onClick={() => handleStatusChange("cancelled")}
            >
              Reject Order
            </Button>
          </>
        );
      case "processing":
        return (
          <Button 
            className="bg-vendor-orange hover:bg-vendor-dark-orange"
            onClick={() => handleStatusChange("ready")}
          >
            Mark as Ready for Pickup
          </Button>
        );
      case "ready":
        return (
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleStatusChange("completed")}
          >
            Complete Order
          </Button>
        );
      default:
        return null;
    }
  };

  const handlePrint = () => {
    toast.info("Printing order details...");
    // In a real app, this would trigger printing functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Order #{order.id}</h2>
                  <div className="flex items-center gap-2 mt-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(order.createdAt, { addSuffix: true })}</span>
                  </div>
                </div>
                <Badge className={getStatusClass(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.quantity}x</span>
                          <span className="ml-2">{item.name}</span>
                        </div>
                        {item.options && item.options.length > 0 && (
                          <ul className="ml-6 mt-1">
                            {item.options.map((option, i) => (
                              <li key={i} className="text-sm text-gray-500">
                                • {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <span className="font-medium">
                        ฿{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>฿{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span>฿{order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2">
                    <span>Total</span>
                    <span>฿{order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                {order.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="font-medium">Customer Notes:</p>
                    <p className="text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-2">
            {getStatusActions()}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p>{order.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p>{order.customerAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
