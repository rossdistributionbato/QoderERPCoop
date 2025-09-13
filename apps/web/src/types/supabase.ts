export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'super_admin' | 'mill_owner' | 'manager' | 'operator'
          mill_id: string | null
          phone: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: 'super_admin' | 'mill_owner' | 'manager' | 'operator'
          mill_id?: string | null
          phone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'super_admin' | 'mill_owner' | 'manager' | 'operator'
          mill_id?: string | null
          phone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: \"users_mill_id_fkey\"
            columns: [\"mill_id\"]
            referencedRelation: \"mills\"
            referencedColumns: [\"id\"]
          }
        ]
      }
      mills: {
        Row: {
          id: string
          name: string
          owner_name: string
          address: string
          phone: string
          license_number: string | null
          capacity_per_day: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          owner_name: string
          address: string
          phone: string
          license_number?: string | null
          capacity_per_day?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          owner_name?: string
          address?: string
          phone?: string
          license_number?: string | null
          capacity_per_day?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      farmers: {
        Row: {
          id: string
          mill_id: string
          name: string
          phone: string
          address: string
          village: string
          aadhar_number: string | null
          bank_account: string | null
          bank_ifsc: string | null
          credit_limit: number
          current_balance: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mill_id: string
          name: string
          phone: string
          address: string
          village: string
          aadhar_number?: string | null
          bank_account?: string | null
          bank_ifsc?: string | null
          credit_limit?: number
          current_balance?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mill_id?: string
          name?: string
          phone?: string
          address?: string
          village?: string
          aadhar_number?: string | null
          bank_account?: string | null
          bank_ifsc?: string | null
          credit_limit?: number
          current_balance?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: \"farmers_mill_id_fkey\"
            columns: [\"mill_id\"]
            referencedRelation: \"mills\"
            referencedColumns: [\"id\"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'super_admin' | 'mill_owner' | 'manager' | 'operator'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}