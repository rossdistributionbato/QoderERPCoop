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
      mills: {
        Row: {
          id: string
          name: string
          license_number: string | null
          address: string | null
          phone: string | null
          email: string | null
          capacity_tons_per_day: number | null
          gst_number: string | null
          pan_number: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          license_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          capacity_tons_per_day?: number | null
          gst_number?: string | null
          pan_number?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          license_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          capacity_tons_per_day?: number | null
          gst_number?: string | null
          pan_number?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          phone: string
          first_name: string
          last_name: string
          role: 'super_admin' | 'mill_owner' | 'manager' | 'operator' | 'accountant'
          mill_id: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone: string
          first_name: string
          last_name: string
          role: 'super_admin' | 'mill_owner' | 'manager' | 'operator' | 'accountant'
          mill_id?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          first_name?: string
          last_name?: string
          role?: 'super_admin' | 'mill_owner' | 'manager' | 'operator' | 'accountant'
          mill_id?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      farmers: {
        Row: {
          id: string
          mill_id: string
          farmer_code: string
          first_name: string
          last_name: string
          phone: string
          alternate_phone: string | null
          email: string | null
          address: string | null
          village: string | null
          district: string | null
          state: string | null
          pincode: string | null
          credit_limit: number
          current_balance: number
          total_business: number
          rating: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mill_id: string
          farmer_code: string
          first_name: string
          last_name: string
          phone: string
          alternate_phone?: string | null
          email?: string | null
          address?: string | null
          village?: string | null
          district?: string | null
          state?: string | null
          pincode?: string | null
          credit_limit?: number
          current_balance?: number
          total_business?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mill_id?: string
          farmer_code?: string
          first_name?: string
          last_name?: string
          phone?: string
          alternate_phone?: string | null
          email?: string | null
          address?: string | null
          village?: string | null
          district?: string | null
          state?: string | null
          pincode?: string | null
          credit_limit?: number
          current_balance?: number
          total_business?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      paddy_intakes: {
        Row: {
          id: string
          mill_id: string
          farmer_id: string
          intake_number: string
          intake_date: string
          gross_weight: number
          tare_weight: number
          net_weight: number
          moisture_percentage: number | null
          purity_percentage: number | null
          rate_per_kg: number
          total_amount: number
          quality_grade: string | null
          remarks: string | null
          vehicle_number: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mill_id: string
          farmer_id: string
          intake_number: string
          intake_date: string
          gross_weight: number
          tare_weight?: number
          moisture_percentage?: number | null
          purity_percentage?: number | null
          rate_per_kg: number
          quality_grade?: string | null
          remarks?: string | null
          vehicle_number?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mill_id?: string
          farmer_id?: string
          intake_number?: string
          intake_date?: string
          gross_weight?: number
          tare_weight?: number
          moisture_percentage?: number | null
          purity_percentage?: number | null
          rate_per_kg?: number
          quality_grade?: string | null
          remarks?: string | null
          vehicle_number?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          mill_id: string
          customer_code: string
          customer_type: 'wholesaler' | 'retailer' | 'direct_consumer' | 'institutional' | 'export'
          business_name: string | null
          contact_person: string
          phone: string
          alternate_phone: string | null
          email: string | null
          address: string | null
          city: string | null
          state: string | null
          pincode: string | null
          gst_number: string | null
          credit_limit: number
          current_balance: number
          total_business: number
          rating: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mill_id: string
          customer_code: string
          customer_type: 'wholesaler' | 'retailer' | 'direct_consumer' | 'institutional' | 'export'
          business_name?: string | null
          contact_person: string
          phone: string
          alternate_phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          gst_number?: string | null
          credit_limit?: number
          current_balance?: number
          total_business?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mill_id?: string
          customer_code?: string
          customer_type?: 'wholesaler' | 'retailer' | 'direct_consumer' | 'institutional' | 'export'
          business_name?: string | null
          contact_person?: string
          phone?: string
          alternate_phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          gst_number?: string | null
          credit_limit?: number
          current_balance?: number
          total_business?: number
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          code: string
          unit_of_measurement: 'kg' | 'quintal' | 'ton' | 'bag'
          default_sale_price: number | null
          hsn_code: string | null
          tax_rate: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          unit_of_measurement: 'kg' | 'quintal' | 'ton' | 'bag'
          default_sale_price?: number | null
          hsn_code?: string | null
          tax_rate?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          unit_of_measurement?: 'kg' | 'quintal' | 'ton' | 'bag'
          default_sale_price?: number | null
          hsn_code?: string | null
          tax_rate?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      inventory_stock: {
        Row: {
          id: string
          mill_id: string
          product_id: string
          current_quantity: number
          minimum_stock_level: number
          maximum_stock_level: number | null
          last_updated: string
        }
        Insert: {
          id?: string
          mill_id: string
          product_id: string
          current_quantity?: number
          minimum_stock_level?: number
          maximum_stock_level?: number | null
          last_updated?: string
        }
        Update: {
          id?: string
          mill_id?: string
          product_id?: string
          current_quantity?: number
          minimum_stock_level?: number
          maximum_stock_level?: number | null
          last_updated?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_mill_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: 'super_admin' | 'mill_owner' | 'manager' | 'operator' | 'accountant'
      customer_type: 'wholesaler' | 'retailer' | 'direct_consumer' | 'institutional' | 'export'
      unit_type: 'kg' | 'quintal' | 'ton' | 'bag'
    }
  }
}