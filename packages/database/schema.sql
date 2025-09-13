-- RiceMillOS Database Schema
-- This file contains the complete database schema for the Rice Mill Management System

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create custom types
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

-- Mills table
CREATE TABLE mills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    capacity_tons_per_day DECIMAL(10,2),
    gst_number VARCHAR(15),
    pan_number VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    mill_id UUID REFERENCES mills(id),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Farmers table
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    farmer_code VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    village VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    credit_limit DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    total_business DECIMAL(15,2) DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    customer_code VARCHAR(50) UNIQUE NOT NULL,
    customer_type customer_type NOT NULL,
    business_name VARCHAR(255),
    contact_person VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    gst_number VARCHAR(15),
    credit_limit DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    total_business DECIMAL(15,2) DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    unit_of_measurement unit_type NOT NULL,
    default_sale_price DECIMAL(10,2),
    hsn_code VARCHAR(20),
    tax_rate DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Paddy intakes table
CREATE TABLE paddy_intakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    farmer_id UUID REFERENCES farmers(id) NOT NULL,
    intake_number VARCHAR(50) UNIQUE NOT NULL,
    intake_date DATE NOT NULL,
    gross_weight DECIMAL(10,3) NOT NULL,
    tare_weight DECIMAL(10,3) DEFAULT 0,
    net_weight DECIMAL(10,3) GENERATED ALWAYS AS (gross_weight - tare_weight) STORED,
    moisture_percentage DECIMAL(5,2),
    purity_percentage DECIMAL(5,2),
    rate_per_kg DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(15,2) GENERATED ALWAYS AS (net_weight * rate_per_kg) STORED,
    quality_grade VARCHAR(20),
    remarks TEXT,
    vehicle_number VARCHAR(20),
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory stock table
CREATE TABLE inventory_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    current_quantity DECIMAL(12,3) NOT NULL DEFAULT 0,
    minimum_stock_level DECIMAL(12,3) DEFAULT 0,
    maximum_stock_level DECIMAL(12,3),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mill_id, product_id)
);

-- Sales orders table
CREATE TABLE sales_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    delivery_date DATE,
    subtotal DECIMAL(15,2) NOT NULL,
    tax_amount DECIMAL(15,2) NOT NULL,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    remarks TEXT,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial transactions table
CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    transaction_number VARCHAR(50) UNIQUE NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,
    party_type VARCHAR(20),
    party_id UUID,
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_method payment_method,
    reference_number VARCHAR(100),
    status VARCHAR(20) DEFAULT 'completed',
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_farmers_mill_id ON farmers(mill_id);
CREATE INDEX idx_farmers_phone ON farmers(phone);
CREATE INDEX idx_paddy_intakes_farmer_date ON paddy_intakes(farmer_id, intake_date DESC);
CREATE INDEX idx_paddy_intakes_mill_date ON paddy_intakes(mill_id, intake_date DESC);
CREATE INDEX idx_sales_orders_customer_date ON sales_orders(customer_id, order_date DESC);
CREATE INDEX idx_sales_orders_mill_date ON sales_orders(mill_id, order_date DESC);
CREATE INDEX idx_financial_transactions_date ON financial_transactions(transaction_date DESC);
CREATE INDEX idx_inventory_stock_mill_product ON inventory_stock(mill_id, product_id);

-- Enable Row Level Security on all tables
ALTER TABLE mills ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE paddy_intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS
CREATE OR REPLACE FUNCTION get_user_mill_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT mill_id 
        FROM users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text AS $$
BEGIN
    RETURN (
        SELECT role::text 
        FROM users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies

-- Mills: Super admins see all, others see only their mill
CREATE POLICY "mills_select_policy" ON mills
    FOR SELECT USING (
        get_user_role() = 'super_admin' OR 
        id = get_user_mill_id()
    );

CREATE POLICY "mills_insert_policy" ON mills
    FOR INSERT WITH CHECK (get_user_role() = 'super_admin');

CREATE POLICY "mills_update_policy" ON mills
    FOR UPDATE USING (
        get_user_role() = 'super_admin' OR 
        id = get_user_mill_id()
    );

-- Users: Can see users in same mill
CREATE POLICY "users_select_policy" ON users
    FOR SELECT USING (
        get_user_role() = 'super_admin' OR 
        mill_id = get_user_mill_id()
    );

CREATE POLICY "users_insert_policy" ON users
    FOR INSERT WITH CHECK (
        get_user_role() IN ('super_admin', 'mill_owner') AND
        mill_id = get_user_mill_id()
    );

CREATE POLICY "users_update_policy" ON users
    FOR UPDATE USING (
        get_user_role() IN ('super_admin', 'mill_owner') OR 
        id = auth.uid()
    );

-- Farmers: Mill-specific access
CREATE POLICY "farmers_select_policy" ON farmers
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "farmers_insert_policy" ON farmers
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "farmers_update_policy" ON farmers
    FOR UPDATE USING (mill_id = get_user_mill_id());

CREATE POLICY "farmers_delete_policy" ON farmers
    FOR DELETE USING (
        mill_id = get_user_mill_id() AND 
        get_user_role() IN ('mill_owner', 'manager')
    );

-- Customers: Mill-specific access
CREATE POLICY "customers_select_policy" ON customers
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "customers_insert_policy" ON customers
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "customers_update_policy" ON customers
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Products: Global products visible to all
CREATE POLICY "products_select_policy" ON products
    FOR SELECT USING (true);

CREATE POLICY "products_insert_policy" ON products
    FOR INSERT WITH CHECK (get_user_role() IN ('super_admin', 'mill_owner'));

CREATE POLICY "products_update_policy" ON products
    FOR UPDATE USING (get_user_role() IN ('super_admin', 'mill_owner'));

-- Paddy intakes: Mill-specific access
CREATE POLICY "paddy_intakes_select_policy" ON paddy_intakes
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "paddy_intakes_insert_policy" ON paddy_intakes
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "paddy_intakes_update_policy" ON paddy_intakes
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Inventory stock: Mill-specific access
CREATE POLICY "inventory_stock_select_policy" ON inventory_stock
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "inventory_stock_insert_policy" ON inventory_stock
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "inventory_stock_update_policy" ON inventory_stock
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Sales orders: Mill-specific access
CREATE POLICY "sales_orders_select_policy" ON sales_orders
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "sales_orders_insert_policy" ON sales_orders
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "sales_orders_update_policy" ON sales_orders
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Financial transactions: Mill-specific access
CREATE POLICY "financial_transactions_select_policy" ON financial_transactions
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "financial_transactions_insert_policy" ON financial_transactions
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

-- Auto-update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply timestamp triggers to relevant tables
CREATE TRIGGER update_mills_updated_at 
    BEFORE UPDATE ON mills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farmers_updated_at 
    BEFORE UPDATE ON farmers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paddy_intakes_updated_at 
    BEFORE UPDATE ON paddy_intakes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_orders_updated_at 
    BEFORE UPDATE ON sales_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default products
INSERT INTO products (name, code, unit_of_measurement, default_sale_price, hsn_code, tax_rate) VALUES
('Basmati Rice', 'RICE_BASMATI', 'kg', 80.00, '10063000', 5.00),
('Non-Basmati Rice', 'RICE_NONBASMATI', 'kg', 45.00, '10063000', 5.00),
('Broken Rice', 'RICE_BROKEN', 'kg', 25.00, '10063000', 5.00),
('Rice Bran', 'BRAN', 'kg', 18.00, '23024000', 18.00),
('Rice Husk', 'HUSK', 'kg', 3.00, '12129900', 5.00),
('Paddy', 'PADDY_RAW', 'kg', 35.00, '10061000', 5.00);

-- Create sample mill for development
INSERT INTO mills (name, license_number, address, phone, email, capacity_tons_per_day, gst_number) VALUES
('Demo Rice Mill', 'ML001', '123 Main Street, Village ABC, District XYZ', '+91-9876543210', 'demo@ricemill.com', 50.00, '12ABCDE1234F1Z5');