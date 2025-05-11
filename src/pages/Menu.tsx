
import { useState } from "react";
import { MenuItem } from "@/components/menu/MenuItem";
import { MenuItemDialog, MenuItemFormData } from "@/components/menu/MenuItemDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  categoryId: string;
  available: boolean;
}

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemFormData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Mock categories - would typically come from an API
  const categories = [
    { id: "appetizers", name: "Appetizers" },
    { id: "main-dishes", name: "Main Dishes" },
    { id: "curries", name: "Curries" },
    { id: "noodles", name: "Noodles" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
  ];

  // Mock menu items - would typically come from an API
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "item1",
      name: "Pad Thai",
      description: "Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts.",
      price: 150,
      imageUrl: "https://source.unsplash.com/random/300x200/?padthai",
      category: "Noodles",
      categoryId: "noodles",
      available: true,
    },
    {
      id: "item2",
      name: "Green Curry",
      description: "Spicy curry made with fresh green chilies and Thai basil.",
      price: 180,
      imageUrl: "https://source.unsplash.com/random/300x200/?curry",
      category: "Curries",
      categoryId: "curries",
      available: true,
    },
    {
      id: "item3",
      name: "Spring Rolls",
      description: "Crispy fried rolls filled with vegetables and glass noodles.",
      price: 80,
      imageUrl: "https://source.unsplash.com/random/300x200/?springrolls",
      category: "Appetizers",
      categoryId: "appetizers",
      available: true,
    },
    {
      id: "item4",
      name: "Mango Sticky Rice",
      description: "Sweet sticky rice with fresh mango and coconut cream.",
      price: 100,
      imageUrl: "https://source.unsplash.com/random/300x200/?mangostickyrice",
      category: "Desserts",
      categoryId: "desserts",
      available: true,
    },
    {
      id: "item5",
      name: "Tom Yum Goong",
      description: "Spicy and sour soup with shrimp, lemongrass, and galangal.",
      price: 220,
      imageUrl: "https://source.unsplash.com/random/300x200/?soup",
      category: "Main Dishes",
      categoryId: "main-dishes",
      available: false,
    },
    {
      id: "item6",
      name: "Thai Iced Tea",
      description: "Sweet tea with milk and spices served over ice.",
      price: 60,
      imageUrl: "https://source.unsplash.com/random/300x200/?thaitea",
      category: "Beverages",
      categoryId: "beverages",
      available: true,
    },
  ]);

  const handleAddOrUpdateItem = (formData: MenuItemFormData) => {
    if (formData.id) {
      // Update existing item
      setMenuItems(
        menuItems.map((item) =>
          item.id === formData.id
            ? {
                ...item,
                ...formData,
                category: categories.find((c) => c.id === formData.categoryId)?.name || "",
              }
            : item
        )
      );
      toast.success("Menu item updated successfully");
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: `item${menuItems.length + 1}`,
        ...formData,
        category: categories.find((c) => c.id === formData.categoryId)?.name || "",
        available: true,
      };
      setMenuItems([...menuItems, newItem]);
      toast.success("Menu item added successfully");
    }
  };

  const handleEditItem = (id: string) => {
    const item = menuItems.find((item) => item.id === id);
    if (item) {
      setEditingItem({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        categoryId: item.categoryId,
      });
      setIsAddDialogOpen(true);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setMenuItems(menuItems.filter((item) => item.id !== itemToDelete));
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
      toast.success("Menu item deleted successfully");
    }
  };

  const handleToggleAvailability = (id: string, available: boolean) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available } : item
      )
    );
    toast(available ? "Item is now available" : "Item marked as unavailable", {
      description: `${menuItems.find((item) => item.id === id)?.name} availability updated.`,
    });
  };

  // Filter menu items based on search query and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "" || item.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
        <Button 
          onClick={() => {
            setEditingItem(null);
            setIsAddDialogOpen(true);
          }}
          className="bg-vendor-orange hover:bg-vendor-dark-orange"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              category={item.category}
              available={item.available}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggleAvailability={handleToggleAvailability}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No menu items found matching your criteria
          </div>
        )}
      </div>
      
      <MenuItemDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddOrUpdateItem}
        editingItem={editingItem}
        categories={categories}
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this menu item. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Menu;
