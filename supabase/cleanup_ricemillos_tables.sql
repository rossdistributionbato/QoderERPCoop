-- =====================================================
-- TARGETED CLEANUP SCRIPT FOR RICEMILLOS TABLES
-- =====================================================
-- This script specifically removes the known RiceMillOS tables
-- and related database objects in the correct dependency order.
-- =====================================================

-- First, disable RLS on all known tables
ALTER TABLE IF EXISTS public.activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brayan DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.farmers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.inventory_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.mill_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.mills DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.paddy_purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.production_batches DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.quality_tests DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.suppliers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;

-- Drop RLS policies for known tables
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Super admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Super admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Super admins can insert users" ON public.users;
DROP POLICY IF EXISTS "Super admins can delete users" ON public.users;

DROP POLICY IF EXISTS "Mill owners can view own mills" ON public.mills;
DROP POLICY IF EXISTS "Super admins can view all mills" ON public.mills;
DROP POLICY IF EXISTS "Mill owners can update own mills" ON public.mills;
DROP POLICY IF EXISTS "Super admins can insert mills" ON public.mills;

DROP POLICY IF EXISTS "Mill users can view farmers" ON public.farmers;
DROP POLICY IF EXISTS "Mill users can insert farmers" ON public.farmers;
DROP POLICY IF EXISTS "Mill users can update farmers" ON public.farmers;

DROP POLICY IF EXISTS "Mill users can view suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Mill users can insert suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Mill users can update suppliers" ON public.suppliers;

DROP POLICY IF EXISTS "Mill users can view paddy purchases" ON public.paddy_purchases;
DROP POLICY IF EXISTS "Mill users can insert paddy purchases" ON public.paddy_purchases;
DROP POLICY IF EXISTS "Mill users can update paddy purchases" ON public.paddy_purchases;

DROP POLICY IF EXISTS "Mill users can view inventory" ON public.inventory_items;
DROP POLICY IF EXISTS "Mill users can insert inventory" ON public.inventory_items;
DROP POLICY IF EXISTS "Mill users can update inventory" ON public.inventory_items;

DROP POLICY IF EXISTS "Mill users can view mill products" ON public.mill_products;
DROP POLICY IF EXISTS "Mill users can insert mill products" ON public.mill_products;
DROP POLICY IF EXISTS "Mill users can update mill products" ON public.mill_products;

-- Drop triggers
DROP TRIGGER IF EXISTS update_updated_at_users ON public.users;
DROP TRIGGER IF EXISTS update_updated_at_mills ON public.mills;
DROP TRIGGER IF EXISTS update_updated_at_farmers ON public.farmers;
DROP TRIGGER IF EXISTS update_updated_at_suppliers ON public.suppliers;
DROP TRIGGER IF EXISTS update_updated_at_paddy_purchases ON public.paddy_purchases;
DROP TRIGGER IF EXISTS update_updated_at_inventory_items ON public.inventory_items;
DROP TRIGGER IF EXISTS update_updated_at_mill_products ON public.mill_products;
DROP TRIGGER IF EXISTS update_updated_at_production_batches ON public.production_batches;
DROP TRIGGER IF EXISTS update_updated_at_sales ON public.sales;
DROP TRIGGER IF EXISTS update_updated_at_payments ON public.payments;
DROP TRIGGER IF EXISTS update_updated_at_quality_tests ON public.quality_tests;
DROP TRIGGER IF EXISTS update_updated_at_activities ON public.activities;
DROP TRIGGER IF EXISTS update_updated_at_brayan ON public.brayan;

-- Drop trigger function
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop tables in dependency order (child tables first)
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.quality_tests CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.sales CASCADE;
DROP TABLE IF EXISTS public.production_batches CASCADE;
DROP TABLE IF EXISTS public.paddy_purchases CASCADE;
DROP TABLE IF EXISTS public.inventory_items CASCADE;
DROP TABLE IF EXISTS public.mill_products CASCADE;
DROP TABLE IF EXISTS public.brayan CASCADE;
DROP TABLE IF EXISTS public.farmers CASCADE;
DROP TABLE IF EXISTS public.suppliers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.mills CASCADE;

-- Drop custom types (enums)
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.paddy_variety CASCADE;
DROP TYPE IF EXISTS public.product_type CASCADE;
DROP TYPE IF EXISTS public.quality_grade CASCADE;
DROP TYPE IF EXISTS public.payment_status CASCADE;
DROP TYPE IF EXISTS public.payment_method CASCADE;
DROP TYPE IF EXISTS public.activity_type CASCADE;

-- Drop specific indexes if they exist
DROP INDEX IF EXISTS public.idx_users_email;
DROP INDEX IF EXISTS public.idx_users_mill_id;
DROP INDEX IF EXISTS public.idx_farmers_mill_id;
DROP INDEX IF EXISTS public.idx_farmers_phone;
DROP INDEX IF EXISTS public.idx_suppliers_mill_id;
DROP INDEX IF EXISTS public.idx_paddy_purchases_mill_id;
DROP INDEX IF EXISTS public.idx_paddy_purchases_farmer_id;
DROP INDEX IF EXISTS public.idx_paddy_purchases_date;
DROP INDEX IF EXISTS public.idx_inventory_mill_id;
DROP INDEX IF EXISTS public.idx_inventory_product_id;
DROP INDEX IF EXISTS public.idx_mill_products_mill_id;
DROP INDEX IF EXISTS public.idx_production_mill_id;
DROP INDEX IF EXISTS public.idx_production_date;
DROP INDEX IF EXISTS public.idx_sales_mill_id;
DROP INDEX IF EXISTS public.idx_sales_date;
DROP INDEX IF EXISTS public.idx_payments_mill_id;
DROP INDEX IF EXISTS public.idx_payments_sales_id;
DROP INDEX IF EXISTS public.idx_quality_tests_mill_id;
DROP INDEX IF EXISTS public.idx_quality_tests_purchase_id;
DROP INDEX IF EXISTS public.idx_activities_mill_id;
DROP INDEX IF EXISTS public.idx_activities_user_id;
DROP INDEX IF EXISTS public.idx_activities_created_at;

-- Verify cleanup
SELECT 'CLEANUP COMPLETED!' as status,
       'All RiceMillOS tables and related objects have been removed.' as message;

-- Show any remaining tables in public schema
SELECT 'REMAINING TABLES:' as check_status;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;