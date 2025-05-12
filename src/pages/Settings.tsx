
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
import { Loader2 } from "lucide-react";
import { useRestaurantSettings } from "@/hooks/useRestaurantSettings";

const bankAccountSchema = z.object({
  account_name: z.string().min(2, { message: "Account name is required" }),
  account_number: z.string().min(10, { message: "Valid account number required" }),
  bank_name: z.string().min(2, { message: "Bank name is required" }),
  branch: z.string().optional(),
});

type BankAccountValues = z.infer<typeof bankAccountSchema>;

const Settings = () => {
  const {
    settings,
    isLoadingSettings,
    updateSettings,
    isUpdatingSettings,
    
    bankAccount,
    isLoadingBankAccount,
    updateBankAccount,
    isUpdatingBankAccount,
  } = useRestaurantSettings();
  
  const [preparationTime, setPreparationTime] = useState<number>(
    settings?.preparation_time_minutes || 20
  );

  const form = useForm<BankAccountValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      account_name: bankAccount?.account_name || "Tour Der Wang Co., Ltd.",
      account_number: bankAccount?.account_number || "1234567890",
      bank_name: bankAccount?.bank_name || "Bangkok Bank",
      branch: bankAccount?.branch || "Sukhumvit",
    },
  });
  
  // Update form when bank account data loads
  useState(() => {
    if (bankAccount) {
      form.reset({
        account_name: bankAccount.account_name,
        account_number: bankAccount.account_number,
        bank_name: bankAccount.bank_name,
        branch: bankAccount.branch || "",
      });
    }
  });
  
  const handleToggleSetting = (field: string, value: boolean) => {
    if (settings) {
      updateSettings({ [field]: value });
    }
  };
  
  const handlePreparationTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPreparationTime(value);
  };
  
  const savePreparationTime = () => {
    if (settings) {
      updateSettings({ preparation_time_minutes: preparationTime });
    }
  };

  const onSubmitBankAccount = (data: BankAccountValues) => {
    updateBankAccount(data);
  };
  
  if (isLoadingSettings || isLoadingBankAccount) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-vendor-orange" />
      </div>
    );
  }

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
                {settings?.restaurant_status ? "Restaurant is open" : "Restaurant is closed"}
              </p>
              <p className="text-sm text-muted-foreground">
                {settings?.restaurant_status
                  ? "You will receive new orders"
                  : "You will not receive new orders"}
              </p>
            </div>
            <Switch
              checked={settings?.restaurant_status || false}
              onCheckedChange={(checked) => handleToggleSetting('restaurant_status', checked)}
              disabled={isUpdatingSettings}
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
                  checked={settings?.receive_order_notifications || false}
                  onCheckedChange={(checked) => handleToggleSetting('receive_order_notifications', checked)}
                  disabled={isUpdatingSettings}
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
                  checked={settings?.receive_review_notifications || false}
                  onCheckedChange={(checked) => handleToggleSetting('receive_review_notifications', checked)}
                  disabled={isUpdatingSettings}
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
                  checked={settings?.auto_accept_orders || false}
                  onCheckedChange={(checked) => handleToggleSetting('auto_accept_orders', checked)}
                  disabled={isUpdatingSettings}
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
                    value={preparationTime}
                    onChange={handlePreparationTimeChange}
                    onBlur={savePreparationTime}
                    className="w-16"
                    disabled={isUpdatingSettings}
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
                <form onSubmit={form.handleSubmit(onSubmitBankAccount)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="account_name"
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
                    name="account_number"
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
                      name="bank_name"
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
                    disabled={isUpdatingBankAccount}
                  >
                    {isUpdatingBankAccount ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Payment Information"}
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
