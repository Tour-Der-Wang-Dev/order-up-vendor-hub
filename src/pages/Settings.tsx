
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const bankAccountSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }),
  accountNumber: z.string().min(10, { message: "Valid account number required" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
  branch: z.string().optional(),
});

type BankAccountValues = z.infer<typeof bankAccountSchema>;

const Settings = () => {
  const [receiveOrderNotifications, setReceiveOrderNotifications] = useState(true);
  const [receiveReviewNotifications, setReceiveReviewNotifications] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [restaurantStatus, setRestaurantStatus] = useState(true);

  const form = useForm<BankAccountValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountName: "Tour Der Wang Co., Ltd.",
      accountNumber: "1234567890",
      bankName: "Bangkok Bank",
      branch: "Sukhumvit",
    },
  });

  const onSubmit = (data: BankAccountValues) => {
    console.log(data);
    toast.success("Payment information updated", {
      description: "Your bank account information has been saved successfully.",
    });
  };

  const handleToggleRestaurantStatus = () => {
    const newStatus = !restaurantStatus;
    setRestaurantStatus(newStatus);
    toast(
      newStatus ? "Restaurant is now open" : "Restaurant is now closed",
      {
        description: newStatus
          ? "You are now accepting new orders"
          : "You will not receive new orders until reopened",
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Status</CardTitle>
          <CardDescription>
            Control whether your restaurant is open to receive orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {restaurantStatus ? "Restaurant is open" : "Restaurant is closed"}
              </p>
              <p className="text-sm text-muted-foreground">
                {restaurantStatus
                  ? "You will receive new orders"
                  : "You will not receive new orders"}
              </p>
            </div>
            <Switch
              checked={restaurantStatus}
              onCheckedChange={handleToggleRestaurantStatus}
            />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ordering">Ordering</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new orders arrive
                  </p>
                </div>
                <Switch
                  checked={receiveOrderNotifications}
                  onCheckedChange={setReceiveOrderNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Review Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when customers leave reviews
                  </p>
                </div>
                <Switch
                  checked={receiveReviewNotifications}
                  onCheckedChange={setReceiveReviewNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ordering" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Settings</CardTitle>
              <CardDescription>
                Configure how orders are processed in your restaurant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Accept Orders</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically accept new orders as they arrive
                  </p>
                </div>
                <Switch
                  checked={autoAcceptOrders}
                  onCheckedChange={setAutoAcceptOrders}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Preparation Time</p>
                  <p className="text-sm text-muted-foreground">
                    Default preparation time for new orders
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min={5}
                    max={60}
                    step={5}
                    defaultValue={20}
                    className="w-16"
                  />
                  <span>minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Configure your bank account information for receiving payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-vendor-orange hover:bg-vendor-dark-orange"
                  >
                    Save Payment Information
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
