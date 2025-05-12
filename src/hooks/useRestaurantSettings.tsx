
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface RestaurantSettings {
  id: string;
  vendor_id: string;
  restaurant_status: boolean;
  auto_accept_orders: boolean;
  receive_order_notifications: boolean;
  receive_review_notifications: boolean;
  preparation_time_minutes: number;
  created_at?: string;
  updated_at?: string;
}

export interface BankAccount {
  id: string;
  vendor_id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  branch?: string;
  created_at?: string;
  updated_at?: string;
}

export function useRestaurantSettings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch vendor ID based on the authenticated user
  const { data: vendorId } = useQuery({
    queryKey: ['vendor-id', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching vendor ID:', error);
        throw error;
      }
      
      return data.id;
    },
    enabled: !!user?.id,
  });
  
  // Fetch restaurant settings
  const { 
    data: settings, 
    isLoading: isLoadingSettings, 
    error: settingsError 
  } = useQuery({
    queryKey: ['restaurant-settings', vendorId],
    queryFn: async () => {
      if (!vendorId) return null;
      
      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('*')
        .eq('vendor_id', vendorId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching restaurant settings:', error);
        throw error;
      }
      
      // If no settings exist yet, create default settings
      if (!data) {
        const defaultSettings: Omit<RestaurantSettings, 'id' | 'created_at' | 'updated_at'> = {
          vendor_id: vendorId,
          restaurant_status: true,
          auto_accept_orders: false,
          receive_order_notifications: true,
          receive_review_notifications: true,
          preparation_time_minutes: 20,
        };
        
        const { data: newSettings, error: createError } = await supabase
          .from('restaurant_settings')
          .insert(defaultSettings)
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating default settings:', createError);
          throw createError;
        }
        
        return newSettings as RestaurantSettings;
      }
      
      return data as RestaurantSettings;
    },
    enabled: !!vendorId,
  });
  
  // Fetch bank account information
  const { 
    data: bankAccount, 
    isLoading: isLoadingBankAccount, 
    error: bankAccountError 
  } = useQuery({
    queryKey: ['bank-account', vendorId],
    queryFn: async () => {
      if (!vendorId) return null;
      
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('vendor_id', vendorId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching bank account:', error);
        throw error;
      }
      
      // If no bank account exists yet, create default bank account
      if (!data) {
        const defaultBankAccount: Omit<BankAccount, 'id' | 'created_at' | 'updated_at'> = {
          vendor_id: vendorId,
          account_name: "Tour Der Wang Co., Ltd.",
          account_number: "1234567890",
          bank_name: "Bangkok Bank",
          branch: "Sukhumvit",
        };
        
        const { data: newBankAccount, error: createError } = await supabase
          .from('bank_accounts')
          .insert(defaultBankAccount)
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating default bank account:', createError);
          throw createError;
        }
        
        return newBankAccount as BankAccount;
      }
      
      return data as BankAccount;
    },
    enabled: !!vendorId,
  });
  
  // Update restaurant settings
  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: Partial<RestaurantSettings>) => {
      if (!vendorId || !settings?.id) {
        throw new Error('Vendor ID or settings not found');
      }
      
      const { data, error } = await supabase
        .from('restaurant_settings')
        .update(updatedSettings)
        .eq('id', settings.id)
        .eq('vendor_id', vendorId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating restaurant settings:', error);
        throw error;
      }
      
      return data as RestaurantSettings;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['restaurant-settings', vendorId], data);
      toast.success('Settings updated successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to update settings', { 
        description: error.message || 'Please try again'
      });
    },
  });
  
  // Update bank account information
  const updateBankAccountMutation = useMutation({
    mutationFn: async (updatedBankAccount: Partial<BankAccount>) => {
      if (!vendorId || !bankAccount?.id) {
        throw new Error('Vendor ID or bank account not found');
      }
      
      const { data, error } = await supabase
        .from('bank_accounts')
        .update(updatedBankAccount)
        .eq('id', bankAccount.id)
        .eq('vendor_id', vendorId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating bank account:', error);
        throw error;
      }
      
      return data as BankAccount;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['bank-account', vendorId], data);
      toast.success('Payment information updated successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to update payment information', { 
        description: error.message || 'Please try again'
      });
    },
  });

  return {
    settings,
    isLoadingSettings,
    settingsError,
    updateSettings: updateSettingsMutation.mutate,
    isUpdatingSettings: updateSettingsMutation.isPending,
    
    bankAccount,
    isLoadingBankAccount,
    bankAccountError,
    updateBankAccount: updateBankAccountMutation.mutate,
    isUpdatingBankAccount: updateBankAccountMutation.isPending,
  };
}
