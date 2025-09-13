-- Create custom types for RiceMillOS
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'mill_owner', 
    'manager',
    'operator',
    'accountant'
);

CREATE TYPE customer_type AS ENUM (
    'wholesaler',
    'retailer',
    'direct_consumer',
    'institutional',
    'export'
);

CREATE TYPE unit_type AS ENUM (
    'kg',
    'quintal',
    'ton',
    'bag'
);

CREATE TYPE payment_method AS ENUM (
    'cash',
    'bank_transfer',
    'upi',
    'cheque',
    'card'
);