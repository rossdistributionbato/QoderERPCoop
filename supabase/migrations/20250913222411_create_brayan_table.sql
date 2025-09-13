-- Create brayan table following RiceMillOS patterns

-- Brayan table (following project conventions)
CREATE TABLE brayan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    brayan_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    priority INTEGER DEFAULT 1,
    assigned_to UUID REFERENCES users(id),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2) DEFAULT 0,
    actual_cost DECIMAL(15,2) DEFAULT 0,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    notes TEXT,
    metadata JSONB,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_brayan_mill_id ON brayan(mill_id);
CREATE INDEX idx_brayan_code ON brayan(brayan_code);
CREATE INDEX idx_brayan_status ON brayan(mill_id, status);
CREATE INDEX idx_brayan_assigned_to ON brayan(assigned_to);
CREATE INDEX idx_brayan_dates ON brayan(start_date, end_date);
CREATE INDEX idx_brayan_active ON brayan(mill_id, is_active);

-- Enable Row Level Security
ALTER TABLE brayan ENABLE ROW LEVEL SECURITY;

-- Create RLS policies following project patterns
CREATE POLICY "brayan_select_policy" ON brayan
    FOR SELECT USING (mill_id = get_user_mill_id());

CREATE POLICY "brayan_insert_policy" ON brayan
    FOR INSERT WITH CHECK (mill_id = get_user_mill_id());

CREATE POLICY "brayan_update_policy" ON brayan
    FOR UPDATE USING (mill_id = get_user_mill_id());

CREATE POLICY "brayan_delete_policy" ON brayan
    FOR DELETE USING (
        mill_id = get_user_mill_id() AND 
        get_user_role() IN ('mill_owner', 'manager')
    );

-- Add timestamp trigger for updated_at
CREATE TRIGGER update_brayan_updated_at 
    BEFORE UPDATE ON brayan
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add sample data
INSERT INTO brayan (mill_id, brayan_code, name, description, category, assigned_to, start_date, budget, created_by) 
SELECT 
    m.id as mill_id,
    'BRY001' as brayan_code,
    'Sample Brayan Project' as name,
    'This is a sample brayan entry for development and testing' as description,
    'Development' as category,
    u.id as assigned_to,
    CURRENT_DATE as start_date,
    10000.00 as budget,
    u.id as created_by
FROM mills m
CROSS JOIN users u
WHERE m.name = 'Demo Rice Mill' 
  AND u.role = 'mill_owner'
LIMIT 1;