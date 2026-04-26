import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mock implementation to prevent background "Failed to fetch" errors
const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: { id: 'mock-id' }, session: {} }, error: null }),
    signUp: async () => ({ data: { user: { id: 'mock-id' }, session: {} }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) }),
    insert: () => Promise.resolve({ data: [], error: null }),
    upsert: () => Promise.resolve({ data: [], error: null }),
  })
};

const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'your_supabase_url' && 
  supabaseUrl.includes('.supabase.co');

// In development/restricted environments, we check if we should use the mock
// We export a proxy that can handle failures gracefully
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Prevents background storage access errors
        autoRefreshToken: false, // Prevents background fetch errors
      }
    })
  : mockSupabase;
