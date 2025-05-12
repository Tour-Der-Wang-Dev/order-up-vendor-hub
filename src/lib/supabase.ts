
import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Type definitions for common Supabase tables
export type Vendor = {
  id: string;
  name: string;
  description: string | null;
  phone_number: string;
  email: string;
  address: string;
  opening_time: string;
  closing_time: string;
  cuisine_type: string;
  logo_url: string | null;
  created_at: string;
  user_id: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  available: boolean;
  vendor_id: string;
  created_at: string;
};

export type Order = {
  id: string;
  vendor_id: string;
  customer_id: string;
  status: 'new' | 'processing' | 'ready' | 'completed' | 'cancelled';
  total_amount: number;
  created_at: string;
  customer_name?: string;
  customer_phone?: string;
};

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any, fallbackMessage = 'An error occurred') {
  console.error('Supabase error:', error);
  
  // Return a user-friendly error message
  if (error?.message) {
    return error.message;
  }
  
  return fallbackMessage;
}
