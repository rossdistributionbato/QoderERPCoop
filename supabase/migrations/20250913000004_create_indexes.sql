-- Create indexes for performance optimization

-- Indexes for farmers table
CREATE INDEX idx_farmers_mill_id ON farmers(mill_id);
CREATE INDEX idx_farmers_phone ON farmers(phone);
CREATE INDEX idx_farmers_active ON farmers(mill_id, is_active);

-- Indexes for paddy_intakes table
CREATE INDEX idx_paddy_intakes_farmer_date ON paddy_intakes(farmer_id, intake_date DESC);
CREATE INDEX idx_paddy_intakes_mill_date ON paddy_intakes(mill_id, intake_date DESC);
CREATE INDEX idx_paddy_intakes_intake_number ON paddy_intakes(intake_number);

-- Indexes for customers table
CREATE INDEX idx_customers_mill_id ON customers(mill_id);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_active ON customers(mill_id, is_active);

-- Indexes for sales_orders table
CREATE INDEX idx_sales_orders_customer_date ON sales_orders(customer_id, order_date DESC);
CREATE INDEX idx_sales_orders_mill_date ON sales_orders(mill_id, order_date DESC);
CREATE INDEX idx_sales_orders_status ON sales_orders(mill_id, status);

-- Indexes for financial_transactions table
CREATE INDEX idx_financial_transactions_date ON financial_transactions(transaction_date DESC);
CREATE INDEX idx_financial_transactions_mill_date ON financial_transactions(mill_id, transaction_date DESC);
CREATE INDEX idx_financial_transactions_party ON financial_transactions(party_type, party_id);

-- Indexes for inventory_stock table
CREATE INDEX idx_inventory_stock_mill_product ON inventory_stock(mill_id, product_id);
CREATE INDEX idx_inventory_stock_low_stock ON inventory_stock(mill_id) WHERE current_quantity <= minimum_stock_level;

-- Indexes for users table
CREATE INDEX idx_users_mill_role ON users(mill_id, role);
CREATE INDEX idx_users_email ON users(email);

-- Full-text search indexes
CREATE INDEX idx_farmers_search ON farmers USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || phone));
CREATE INDEX idx_customers_search ON customers USING gin(to_tsvector('english', business_name || ' ' || contact_person || ' ' || phone));