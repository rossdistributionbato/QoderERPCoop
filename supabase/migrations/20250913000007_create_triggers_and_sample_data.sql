-- Create triggers and insert sample data

-- Function to calculate total amount for paddy intakes
CREATE OR REPLACE FUNCTION calculate_paddy_total_amount()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_amount = (NEW.gross_weight - NEW.tare_weight) * NEW.rate_per_kg;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

CREATE TRIGGER calculate_paddy_total
    BEFORE INSERT OR UPDATE ON paddy_intakes
    FOR EACH ROW EXECUTE FUNCTION calculate_paddy_total_amount();

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