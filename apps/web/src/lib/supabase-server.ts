import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './supabase';

// Server-side Supabase client for server components only
export const createServerComponentSupabase = () => 
  createServerComponentClient<Database>({ cookies });