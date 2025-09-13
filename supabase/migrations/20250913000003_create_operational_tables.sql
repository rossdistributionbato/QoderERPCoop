-- Create operational tables for RiceMillOS

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
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
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