
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, X } from "lucide-react";

interface MenuItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: MenuItemFormData) => void;
  editingItem: MenuItemFormData | null;
  categories: { id: string; name: string }[];
}

export interface MenuItemFormData {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
}

export function MenuItemDialog({
  open,
  onOpenChange,
  onSave,
  editingItem,
  categories,
}: MenuItemDialogProps) {
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    imageUrl: "",
  });

  // Reset form or populate with editing data when dialog opens
  useEffect(() => {
    if (open) {
      if (editingItem) {
        setFormData(editingItem);
      } else {
        setFormData({
          name: "",
          description: "",
          price: 0,
          categoryId: categories.length > 0 ? categories[0].id : "",
          imageUrl: "",
        });
      }
    }
  }, [open, editingItem, categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Menu Item" : "Add Menu Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (฿)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, categoryId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL or upload"
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              {formData.imageUrl && (
                <div className="relative mt-2 h-24 w-24 rounded overflow-hidden bg-gray-100">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-5 w-5"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, imageUrl: "" }))
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-vendor-orange hover:bg-vendor-dark-orange">
              {editingItem ? "Update" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
