-- =====================================================
-- SUPABASE DATABASE CLEANUP SCRIPT
-- =====================================================
-- This script removes all existing tables, functions, triggers, and policies
-- to prepare for a clean database state before applying new migrations.
-- 
-- WARNING: This will DELETE ALL DATA in the tables!
-- Only run this if you want to completely reset the database.
-- =====================================================

-- Disable Row Level Security temporarily for cleanup
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

-- Drop all RLS policies first
DO $$ 
DECLARE 
    policy_record RECORD;
BEGIN 
    -- Get all policies and drop them
    FOR policy_record IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      policy_record.policyname, 
                      policy_record.schemaname, 
                      policy_record.tablename);
    END LOOP;
END $$;

-- Drop all triggers
DO $$ 
DECLARE 
    trigger_record RECORD;
BEGIN 
    FOR trigger_record IN 
        SELECT trigger_name, event_object_table 
        FROM information_schema.triggers 
        WHERE trigger_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I', 
                      trigger_record.trigger_name, 
                      trigger_record.event_object_table);
    END LOOP;
END $$;

-- Drop all functions (including trigger functions)
DO $$ 
DECLARE 
    func_record RECORD;
BEGIN 
    FOR func_record IN 
        SELECT routine_name 
        FROM information_schema.routines 
        WHERE routine_schema = 'public' 
        AND routine_type = 'FUNCTION'
    LOOP
        EXECUTE format('DROP FUNCTION IF EXISTS public.%I() CASCADE', 
                      func_record.routine_name);
    END LOOP;
END $$;

-- Drop all views first (in case any exist)
DO $$ 
DECLARE 
    view_record RECORD;
BEGIN 
    FOR view_record IN 
        SELECT table_name 
        FROM information_schema.views 
        WHERE table_schema = 'public'
    LOOP
        EXECUTE format('DROP VIEW IF EXISTS public.%I CASCADE', 
                      view_record.table_name);
    END LOOP;
END $$;

-- Drop specific tables in dependency order (child tables first)
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

-- Drop any remaining tables in public schema
DO $$ 
DECLARE 
    table_record RECORD;
BEGIN 
    FOR table_record IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    LOOP
        EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', 
                      table_record.table_name);
    END LOOP;
END $$;

-- Drop all custom types (enums)
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.paddy_variety CASCADE;
DROP TYPE IF EXISTS public.product_type CASCADE;
DROP TYPE IF EXISTS public.quality_grade CASCADE;
DROP TYPE IF EXISTS public.payment_status CASCADE;
DROP TYPE IF EXISTS public.payment_method CASCADE;
DROP TYPE IF EXISTS public.activity_type CASCADE;

-- Drop any remaining custom types
DO $$ 
DECLARE 
    type_record RECORD;
BEGIN 
    FOR type_record IN 
        SELECT typname 
        FROM pg_type 
        WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
        AND typtype = 'e'  -- enum types
    LOOP
        EXECUTE format('DROP TYPE IF EXISTS public.%I CASCADE', 
                      type_record.typname);
    END LOOP;
END $$;

-- Clean up any remaining sequences
DO $$ 
DECLARE 
    seq_record RECORD;
BEGIN 
    FOR seq_record IN 
        SELECT sequence_name 
        FROM information_schema.sequences 
        WHERE sequence_schema = 'public'
    LOOP
        EXECUTE format('DROP SEQUENCE IF EXISTS public.%I CASCADE', 
                      seq_record.sequence_name);
    END LOOP;
END $$;

-- Drop all indexes in public schema (except system indexes)
DO $$ 
DECLARE 
    index_record RECORD;
BEGIN 
    FOR index_record IN 
        SELECT indexname 
        FROM pg_indexes 
        WHERE schemaname = 'public'
        AND indexname NOT LIKE 'pg_%'
    LOOP
        EXECUTE format('DROP INDEX IF EXISTS public.%I', 
                      index_record.indexname);
    END LOOP;
END $$;

-- Verify cleanup - show remaining objects
SELECT 'REMAINING TABLES:' as cleanup_status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

SELECT 'REMAINING FUNCTIONS:' as cleanup_status;
SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION';

SELECT 'REMAINING TYPES:' as cleanup_status;
SELECT typname FROM pg_type WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public') AND typtype = 'e';

-- Reset the database to a clean state
COMMIT;

-- Success message
SELECT 'DATABASE CLEANUP COMPLETED SUCCESSFULLY!' as status,
       'All tables, functions, triggers, policies, types, and indexes have been removed.' as message,
       'The database is now ready for fresh migrations.' as next_step;