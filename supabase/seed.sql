-- Seed data for RiceMillOS development
-- This file contains sample data for testing and development

-- Note: This assumes the demo mill with ID exists
-- You may need to adjust the mill_id values based on your actual mill ID

-- Get the demo mill ID for reference
-- You can run: SELECT id FROM mills WHERE name = 'Demo Rice Mill';

-- Sample farmers (replace 'YOUR_MILL_ID' with actual mill ID)
/*
INSERT INTO farmers (mill_id, farmer_code, first_name, last_name, phone, address, village, district, state, pincode, credit_limit) 
SELECT 
    m.id as mill_id,
    'F001' as farmer_code,
    'Rajesh' as first_name,
    'Kumar' as last_name,
    '+91-9876543210' as phone,
    'Village Road, House No. 123' as address,
    'Kharif Nagar' as village,
    'Rice District' as district,
    'Punjab' as state,
    '144001' as pincode,
    50000.00 as credit_limit
FROM mills m WHERE m.name = 'Demo Rice Mill'
UNION ALL
SELECT 
    m.id,
    'F002',
    'Suresh',
    'Singh',
    '+91-9876543211',
    'Main Street, Plot 456',
    'Paddy Village',
    'Rice District',
    'Punjab',
    '144002',
    75000.00
FROM mills m WHERE m.name = 'Demo Rice Mill'
UNION ALL
SELECT 
    m.id,
    'F003',
    'Ramesh',
    'Patel',
    '+91-9876543212',
    'Farm House, Survey No. 789',
    'Harvest Town',
    'Rice District',
    'Punjab',
    '144003',
    60000.00
FROM mills m WHERE m.name = 'Demo Rice Mill';

-- Sample customers
INSERT INTO customers (mill_id, customer_code, customer_type, business_name, contact_person, phone, address, city, state, gst_number, credit_limit)
SELECT 
    m.id as mill_id,
    'C001' as customer_code,
    'wholesaler' as customer_type,
    'Rice Traders Pvt Ltd' as business_name,
    'Amit Sharma' as contact_person,
    '+91-9876543220' as phone,
    'Wholesale Market, Shop No. 15' as address,
    'Rice City' as city,
    'Punjab' as state,
    '03ABCDE1234F1Z5' as gst_number,
    100000.00 as credit_limit
FROM mills m WHERE m.name = 'Demo Rice Mill'
UNION ALL
SELECT 
    m.id,
    'C002',
    'retailer',
    'Local Rice Store',
    'Priya Gupta',
    '+91-9876543221',
    'Main Bazaar, Shop 25',
    'Rice City',
    'Punjab',
    '03FGHIJ5678K2L6',
    25000.00
FROM mills m WHERE m.name = 'Demo Rice Mill'
UNION ALL
SELECT 
    m.id,
    'C003',
    'institutional',
    'City School Canteen',
    'Principal Kumar',
    '+91-9876543222',
    'School Campus, Administrative Block',
    'Rice City',
    'Punjab',
    '03MNOPQ9012R3S7',
    50000.00
FROM mills m WHERE m.name = 'Demo Rice Mill';
*/

-- Instructions for manual setup:
-- 1. First, find your mill ID by running:
--    SELECT id, name FROM mills;
-- 
-- 2. Replace the mill_id values in the INSERT statements above
-- 
-- 3. Uncomment and run the INSERT statements
--
-- 4. Or use the Supabase dashboard to add sample data manually

-- You can also create sample data through the application interface
-- once the frontend is complete