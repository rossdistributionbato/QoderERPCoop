'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { PWAInstaller } from '@/lib/pwa';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => 
    createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ supabase }}>
        <AuthProvider>
          <PWAInstaller />
          {children}
        </AuthProvider>
      </Context.Provider>
    </QueryClientProvider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  
  return context;
};