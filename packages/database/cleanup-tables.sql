-- RiceMillOS Database Cleanup Script
-- This script will drop all existing tables and recreate them fresh
-- WARNING: This will delete ALL data in your database!

-- First, disable Row Level Security and drop policies
ALTER TABLE IF EXISTS financial_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sales_orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inventory_stock DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS paddy_intakes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS farmers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS mills DISABLE ROW LEVEL SECURITY;

-- Drop all policies (if they exist)
DROP POLICY IF EXISTS "financial_transactions_select_policy" ON financial_transactions;
DROP POLICY IF EXISTS "financial_transactions_insert_policy" ON financial_transactions;
DROP POLICY IF EXISTS "sales_orders_select_policy" ON sales_orders;
DROP POLICY IF EXISTS "sales_orders_insert_policy" ON sales_orders;
DROP POLICY IF EXISTS "sales_orders_update_policy" ON sales_orders;
DROP POLICY IF EXISTS "inventory_stock_select_policy" ON inventory_stock;
DROP POLICY IF EXISTS "inventory_stock_insert_policy" ON inventory_stock;
DROP POLICY IF EXISTS "inventory_stock_update_policy" ON inventory_stock;
DROP POLICY IF EXISTS "paddy_intakes_select_policy" ON paddy_intakes;
DROP POLICY IF EXISTS "paddy_intakes_insert_policy" ON paddy_intakes;
DROP POLICY IF EXISTS "paddy_intakes_update_policy" ON paddy_intakes;
DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "customers_select_policy" ON customers;
DROP POLICY IF EXISTS "customers_insert_policy" ON customers;
DROP POLICY IF EXISTS "customers_update_policy" ON customers;
DROP POLICY IF EXISTS "farmers_select_policy" ON farmers;
DROP POLICY IF EXISTS "farmers_insert_policy" ON farmers;
DROP POLICY IF EXISTS "farmers_update_policy" ON farmers;
DROP POLICY IF EXISTS "farmers_delete_policy" ON farmers;
DROP POLICY IF EXISTS "users_select_policy" ON users;
DROP POLICY IF EXISTS "users_insert_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "mills_select_policy" ON mills;
DROP POLICY IF EXISTS "mills_insert_policy" ON mills;
DROP POLICY IF EXISTS "mills_update_policy" ON mills;

-- Drop all triggers
DROP TRIGGER IF EXISTS update_financial_transactions_updated_at ON financial_transactions;
DROP TRIGGER IF EXISTS update_sales_orders_updated_at ON sales_orders;
DROP TRIGGER IF EXISTS update_inventory_stock_updated_at ON inventory_stock;
DROP TRIGGER IF EXISTS update_paddy_intakes_updated_at ON paddy_intakes;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS update_farmers_updated_at ON farmers;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_mills_updated_at ON mills;

-- Drop all functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS get_user_role();
DROP FUNCTION IF EXISTS get_user_mill_id();

-- Drop all tables in correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS financial_transactions CASCADE;
DROP TABLE IF EXISTS sales_orders CASCADE;
DROP TABLE IF EXISTS inventory_stock CASCADE;
DROP TABLE IF EXISTS paddy_intakes CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS farmers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS mills CASCADE;

-- Drop all custom types
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS customer_type CASCADE;
DROP TYPE IF EXISTS unit_type CASCADE;

-- Drop all indexes (they should be dropped with tables, but just in case)
DROP INDEX IF EXISTS idx_farmers_mill_id;
DROP INDEX IF EXISTS idx_farmers_phone;
DROP INDEX IF EXISTS idx_paddy_intakes_farmer_date;
DROP INDEX IF EXISTS idx_paddy_intakes_mill_date;
DROP INDEX IF EXISTS idx_sales_orders_customer_date;
DROP INDEX IF EXISTS idx_sales_orders_mill_date;
DROP INDEX IF EXISTS idx_financial_transactions_date;
DROP INDEX IF EXISTS idx_inventory_stock_mill_product;

-- Success message
SELECT 'All RiceMillOS tables, functions, types, and policies have been dropped successfully! 🧹' as cleanup_status;

-- Optional: List remaining tables to verify cleanup
SELECT 
    schemaname,
    tablename
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename NOT IN ('schema_migrations', 'supabase_migrations');