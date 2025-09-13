-- Create Row Level Security policies

-- Mills policies
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

-- Users policies
CREATE POLICY "users_select_policy" ON users
    FOR SELECT USING (
        get_user_role() = 'super_admin' OR 
        mill_id = get_user_mill_id()
    );

CREATE POLICY "users_insert_policy" ON users
    FOR INSERT WITH CHECK (
        get_user_role() IN ('super_admin', 'mill_owner')
    );

CREATE POLICY "users_update_policy" ON users
    FOR UPDATE USING (
        get_user_role() IN ('super_admin', 'mill_owner') OR 
        id = auth.uid()
    );

-- Farmers policies
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

-- Customers policies
CREATE POLICY "customers_select_policy" ON customers
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "customers_insert_policy" ON customers
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "customers_update_policy" ON customers
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Products policies (global products visible to all)
CREATE POLICY "products_select_policy" ON products
    FOR SELECT USING (true);

CREATE POLICY "products_insert_policy" ON products
    FOR INSERT WITH CHECK (get_user_role() IN ('super_admin', 'mill_owner'));

CREATE POLICY "products_update_policy" ON products
    FOR UPDATE USING (get_user_role() IN ('super_admin', 'mill_owner'));

-- Paddy intakes policies
CREATE POLICY "paddy_intakes_select_policy" ON paddy_intakes
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "paddy_intakes_insert_policy" ON paddy_intakes
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "paddy_intakes_update_policy" ON paddy_intakes
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Inventory stock policies
CREATE POLICY "inventory_stock_select_policy" ON inventory_stock
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "inventory_stock_insert_policy" ON inventory_stock
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "inventory_stock_update_policy" ON inventory_stock
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Sales orders policies
CREATE POLICY "sales_orders_select_policy" ON sales_orders
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "sales_orders_insert_policy" ON sales_orders
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "sales_orders_update_policy" ON sales_orders
    FOR UPDATE USING (mill_id = get_user_mill_id());

-- Financial transactions policies
CREATE POLICY "financial_transactions_select_policy" ON financial_transactions
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "financial_transactions_insert_policy" ON financial_transactions
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());