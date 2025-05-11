
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderProps {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: "new" | "processing" | "ready" | "completed" | "cancelled";
  createdAt: Date;
  onStatusChange?: (id: string, status: "processing" | "ready" | "completed" | "cancelled") => void;
}

export function OrderItem({
  id,
  customerName,
  items,
  total,
  status,
  createdAt,
  onStatusChange,
}: OrderProps) {
  const getStatusClass = (
    status: "new" | "processing" | "ready" | "completed" | "cancelled"
  ) => {
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

  const getStatusActions = () => {
    switch (status) {
      case "new":
        return (
          <>
            <Button
              variant="default"
              className="bg-vendor-orange hover:bg-vendor-dark-orange"
              onClick={() => onStatusChange?.(id, "processing")}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="text-gray-600"
              onClick={() => onStatusChange?.(id, "cancelled")}
            >
              Reject
            </Button>
          </>
        );
      case "processing":
        return (
          <Button
            variant="default"
            className="bg-vendor-orange hover:bg-vendor-dark-orange"
            onClick={() => onStatusChange?.(id, "ready")}
          >
            Mark Ready
          </Button>
        );
      case "ready":
        return (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onStatusChange?.(id, "completed")}
          >
            Complete Order
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-6 mb-4">
              <h3 className="text-lg font-semibold">Order #{id}</h3>
              <Badge className={getStatusClass(status)}>{status}</Badge>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Customer:</span> {customerName}
            </p>
            <ul className="mb-2">
              {items.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.quantity}x {item.name} - ฿{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="font-semibold">Total: ฿{total.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to={`/orders/${id}`}>
                <Eye className="h-4 w-4 mr-1" /> Details
              </Link>
            </Button>
            {getStatusActions()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
