import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need sessions for a public website
  },
});

// Helper function to handle Supabase errors
export function handleSupabaseError(error, context = '') {
  console.error(`Supabase Error${context ? ` (${context})` : ''}:`, error);
  return null;
}

// Cache duration in seconds (5 minutes)
export const CACHE_DURATION = 300;

// Helper to create a cache key
export function getCacheKey(table, query = '') {
  return `${table}_${query}`;
}
