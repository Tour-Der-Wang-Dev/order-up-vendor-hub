
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, Vendor } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function useVendorProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch vendor profile
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['vendor-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching vendor profile:', error);
        throw error;
      }
      
      return data as Vendor;
    },
    enabled: !!user?.id,
  });

  // Update vendor profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<Vendor>) => {
      if (!user?.id || !profile?.id) {
        throw new Error('User not authenticated or vendor profile not found');
      }
      
      const { data, error } = await supabase
        .from('vendors')
        .update(updatedProfile)
        .eq('id', profile.id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating vendor profile:', error);
        throw error;
      }
      
      return data as Vendor;
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['vendor-profile', user?.id] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to update profile', { 
        description: error.message || 'Please try again'
      });
    },
  });

  // Upload logo
  const uploadLogo = async (file: File) => {
    if (!user?.id || !profile?.id) {
      toast.error('User not authenticated or vendor profile not found');
      return null;
    }
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-logo-${Date.now()}.${fileExt}`;
      const filePath = `vendor-logos/${fileName}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('vendor-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data } = supabase
        .storage
        .from('vendor-assets')
        .getPublicUrl(filePath);
      
      // Update profile with new logo URL
      await updateProfileMutation.mutateAsync({ logo_url: data.publicUrl });
      
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo', {
        description: error.message || 'Please try again'
      });
      return null;
    }
  };

  return {
    profile,
    isLoading,
    error,
    isEditing,
    setIsEditing,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    uploadLogo,
  };
}
