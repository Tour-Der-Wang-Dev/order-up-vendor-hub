
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TimeInput } from "./TimeInput";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  phoneNumber: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  openingTime: z.string(),
  closingTime: z.string(),
  cuisineType: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function VendorProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/lovable-uploads/90494f25-3cb7-4324-84b1-ae6a73fe364b.png");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Tour Der Wang",
      description: "Authentic Thai cuisine featuring fresh ingredients and traditional recipes.",
      phoneNumber: "023456789",
      email: "contact@tourderwang.com",
      address: "123 Food Street, Bangkok 10110",
      openingTime: "10:00",
      closingTime: "22:00",
      cuisineType: "Thai",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, this would send the data to your API
    console.log(data);
    setIsEditing(false);
    // Here you would typically show a success message
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={logoUrl} alt="Restaurant logo" />
                <AvatarFallback className="bg-vendor-orange text-white text-3xl">TW</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="outline"
                className="w-full"
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!isEditing} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisineType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine Type</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!isEditing} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!isEditing} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!isEditing} 
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 col-span-full md:col-span-2">
                  <FormField
                    control={form.control}
                    name="openingTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Opening Time</FormLabel>
                        <TimeInput 
                          value={field.value}
                          onChange={field.onChange} 
                          disabled={!isEditing}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="closingTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Closing Time</FormLabel>
                        <TimeInput 
                          value={field.value}
                          onChange={field.onChange} 
                          disabled={!isEditing}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-full md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!isEditing} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Restaurant Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          disabled={!isEditing} 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-vendor-orange hover:bg-vendor-dark-orange"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
