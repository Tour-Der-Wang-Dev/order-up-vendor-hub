
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
import { Camera, Loader2 } from "lucide-react";
import { useVendorProfile } from "@/hooks/useVendorProfile";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  phone_number: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  opening_time: z.string(),
  closing_time: z.string(),
  cuisine_type: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function VendorProfileForm() {
  const { 
    profile, 
    isLoading, 
    error, 
    isEditing, 
    setIsEditing,
    updateProfile,
    isUpdating,
    uploadLogo
  } = useVendorProfile();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "Tour Der Wang",
      description: profile?.description || "Authentic Thai cuisine featuring fresh ingredients and traditional recipes.",
      phone_number: profile?.phone_number || "023456789",
      email: profile?.email || "contact@tourderwang.com",
      address: profile?.address || "123 Food Street, Bangkok 10110",
      opening_time: profile?.opening_time || "10:00",
      closing_time: profile?.closing_time || "22:00",
      cuisine_type: profile?.cuisine_type || "Thai",
    },
  });
  
  // Update form when profile data loads
  useState(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        description: profile.description || "",
        phone_number: profile.phone_number,
        email: profile.email,
        address: profile.address,
        opening_time: profile.opening_time,
        closing_time: profile.closing_time,
        cuisine_type: profile.cuisine_type,
      });
    }
  });

  function onSubmit(data: ProfileFormValues) {
    updateProfile({
      name: data.name,
      description: data.description,
      phone_number: data.phone_number,
      email: data.email,
      address: data.address,
      opening_time: data.opening_time,
      closing_time: data.closing_time,
      cuisine_type: data.cuisine_type,
    });
  }
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File is too large", {
        description: "Please choose an image under 5MB"
      });
      return;
    }
    
    await uploadLogo(file);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-vendor-orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading profile: {(error as any).message}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage 
                  src={profile?.logo_url || "/lovable-uploads/90494f25-3cb7-4324-84b1-ae6a73fe364b.png"} 
                  alt="Restaurant logo" 
                />
                <AvatarFallback className="bg-vendor-orange text-white text-3xl">
                  {profile?.name?.substring(0, 2).toUpperCase() || "TW"}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="logo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <label htmlFor="logo-upload">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow cursor-pointer"
                      type="button"
                      asChild
                    >
                      <span>
                        <Camera className="h-4 w-4" />
                      </span>
                    </Button>
                  </label>
                </>
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
                  name="cuisine_type"
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
                  name="phone_number"
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
                    name="opening_time"
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
                    name="closing_time"
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
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-vendor-orange hover:bg-vendor-dark-orange"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Changes"}
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
