'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentSupabase, type UserRole } from '@/lib/supabase';

type AuthUser = User & {
  user_metadata?: {
    full_name?: string;
    role?: UserRole;
    mill_id?: string;
  };
};

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentSupabase();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user as AuthUser || null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth event:', event, session?.user?.email, 'Current path:', pathname);

        setSession(session);
        setUser(session?.user as AuthUser || null);
        setLoading(false);

        // Handle routing based on auth state
        if (event === 'SIGNED_IN') {
          // Only redirect to dashboard if not already on a dashboard page
          if (!pathname.startsWith('/dashboard')) {
            console.log('🔐 SIGNED_IN: Redirecting to /dashboard');
            router.push('/dashboard');
          } else {
            console.log('🔐 SIGNED_IN: Already on dashboard page, no redirect needed');
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('🔐 SIGNED_OUT: Redirecting to /auth/login');
          router.push('/auth/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth, pathname]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('SignOut error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error };
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates,
      });
      return { error };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to check if user has specific permission
export function usePermissions() {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role as UserRole;

  const hasPermission = (permission: string): boolean => {
    if (!userRole) return false;
    
    // Super admin has all permissions
    if (userRole === 'super_admin') return true;
    
    // Import the permission check function
    const rolePermissions = {
      mill_owner: [
        'mills:read', 'mills:update', 'users:create', 'users:read', 'users:update',
        'farmers:*', 'inventory:*', 'sales:*', 'reports:*'
      ],
      manager: [
        'farmers:*', 'inventory:*', 'sales:*', 'reports:read', 'procurement:*'
      ],
      operator: [
        'farmers:read', 'farmers:create', 'farmers:update', 'procurement:*',
        'inventory:read', 'sales:create', 'sales:read'
      ],
    };

    const permissions = rolePermissions[userRole] || [];
    return permissions.includes('*') || permissions.includes(permission);
  };

  return { hasPermission, userRole };
}