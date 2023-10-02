import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types.ts'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
console.log('supabaseURL: ', supabaseUrl)

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
console.log('supabaseAnonKey: ', supabaseAnonKey)

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
