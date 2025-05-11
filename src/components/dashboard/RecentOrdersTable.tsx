
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: "new" | "processing" | "ready" | "completed" | "cancelled";
  items: number;
  createdAt: Date;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "order-status-new";
      case "processing":
        return "order-status-processing";
      case "ready":
        return "order-status-ready";
      case "completed":
        return "order-status-completed";
      case "cancelled":
        return "order-status-cancelled";
      default:
        return "";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "New";
      case "processing":
        return "Processing";
      case "ready":
        return "Ready";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>฿{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <span className={getStatusClass(order.status)}>
                  {getStatusText(order.status)}
                </span>
              </TableCell>
              <TableCell>{formatDistanceToNow(order.createdAt, { addSuffix: true })}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/orders/${order.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
