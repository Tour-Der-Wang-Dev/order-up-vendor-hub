
import { useState } from "react";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string, available: boolean) => void;
}

export function MenuItem({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  available,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuItemProps) {
  const [isAvailable, setIsAvailable] = useState(available);

  const handleAvailabilityToggle = () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    onToggleAvailability(id, newAvailability);
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Badge variant="secondary" className="mb-2 bg-vendor-cream">
          {category}
        </Badge>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
        
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold">฿{price.toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {isAvailable ? "Available" : "Unavailable"}
            </span>
            <Switch
              checked={isAvailable}
              onCheckedChange={handleAvailabilityToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
