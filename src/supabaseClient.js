import { createClient } from '@supabase/supabase-js'

// Credentials are loaded from environment variables.
// Local development: create a .env.local file (see .env.example)
// Vercel production: add these in the Vercel project → Settings → Environment Variables
const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars.\n' +
    'Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
