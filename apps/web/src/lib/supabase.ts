import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
// Note: cookies import moved to server-only file to avoid client/server conflicts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'super_admin' | 'mill_owner' | 'manager' | 'operator';
          mill_id: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: 'super_admin' | 'mill_owner' | 'manager' | 'operator';
          mill_id?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'super_admin' | 'mill_owner' | 'manager' | 'operator';
          mill_id?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      mills: {
        Row: {
          id: string;
          name: string;
          owner_name: string;
          address: string;
          phone: string;
          license_number: string | null;
          capacity_per_day: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          owner_name: string;
          address: string;
          phone: string;
          license_number?: string | null;
          capacity_per_day?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          owner_name?: string;
          address?: string;
          phone?: string;
          license_number?: string | null;
          capacity_per_day?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

// Client-side Supabase client for components
export const createClientComponentSupabase = () => 
  createClientComponentClient<Database>();

// Service role client for admin operations (use with caution)
export const createServiceRoleClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Auth event types
export type AuthChangeEvent = 
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'PASSWORD_RECOVERY';

// User role permissions
export const ROLE_PERMISSIONS = {
  super_admin: ['*'], // All permissions
  mill_owner: [
    'mills:read',
    'mills:update',
    'users:create',
    'users:read',
    'users:update',
    'farmers:*',
    'inventory:*',
    'sales:*',
    'reports:*',
  ],
  manager: [
    'farmers:*',
    'inventory:*',
    'sales:*',
    'reports:read',
    'procurement:*',
  ],
  operator: [
    'farmers:read',
    'farmers:create',
    'farmers:update',
    'procurement:*',
    'inventory:read',
    'sales:create',
    'sales:read',
  ],
} as const;

export type UserRole = keyof typeof ROLE_PERMISSIONS;
export type Permission = typeof ROLE_PERMISSIONS[UserRole][number];

// Helper function to check permissions
export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole] as readonly string[];
  return rolePermissions.includes('*') || rolePermissions.includes(permission);
};