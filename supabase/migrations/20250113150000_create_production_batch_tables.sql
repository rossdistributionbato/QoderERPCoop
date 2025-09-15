-- Migration: Create production batch management tables
-- Description: Support advanced batch processing workflow with stages, quality checks, and real-time monitoring

-- Production Batches table
CREATE TABLE IF NOT EXISTS production_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    mill_id UUID REFERENCES mills(id),
    created_by UUID REFERENCES auth.users(id),
    
    -- Batch Planning
    input_material VARCHAR(100) NOT NULL,
    planned_quantity DECIMAL(10,2) NOT NULL,
    planned_start_date TIMESTAMP WITH TIME ZONE,
    estimated_completion TIMESTAMP WITH TIME ZONE,
    
    -- Batch Execution
    actual_start_date TIMESTAMP WITH TIME ZONE,
    actual_completion TIMESTAMP WITH TIME ZONE,
    processed_quantity DECIMAL(10,2) DEFAULT 0,
    yield_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- Assignment
    assigned_operator UUID REFERENCES auth.users(id),
    equipment VARCHAR(100),
    
    -- Status and Stage
    status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'paused', 'quality_check', 'cancelled')),
    current_stage VARCHAR(20) DEFAULT 'cleaning' CHECK (current_stage IN ('cleaning', 'husking', 'polishing', 'grading', 'packaging')),
    
    -- Quality
    target_quality_grade VARCHAR(50),
    actual_quality_grade VARCHAR(50),
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch Stages table
CREATE TABLE IF NOT EXISTS batch_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES production_batches(id) ON DELETE CASCADE,
    
    stage_name VARCHAR(20) NOT NULL CHECK (stage_name IN ('cleaning', 'husking', 'polishing', 'grading', 'packaging')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'skipped')),
    
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    efficiency_percentage DECIMAL(5,2) DEFAULT 0,
    
    operator_id UUID REFERENCES auth.users(id),
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(batch_id, stage_name)
);

-- Quality Checks table
CREATE TABLE IF NOT EXISTS quality_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES production_batches(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES batch_stages(id) ON DELETE CASCADE,
    
    parameter_name VARCHAR(100) NOT NULL,
    measured_value DECIMAL(10,4) NOT NULL,
    target_value DECIMAL(10,4),
    tolerance_range DECIMAL(10,4),
    
    status VARCHAR(20) DEFAULT 'pass' CHECK (status IN ('pass', 'fail', 'warning')),
    
    checked_by UUID REFERENCES auth.users(id),
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch Alerts table
CREATE TABLE IF NOT EXISTS batch_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES production_batches(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES batch_stages(id) ON DELETE CASCADE,
    
    alert_type VARCHAR(20) NOT NULL CHECK (alert_type IN ('info', 'warning', 'error', 'critical')),
    message TEXT NOT NULL,
    
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Production Equipment table
CREATE TABLE IF NOT EXISTS production_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id),
    
    equipment_name VARCHAR(100) NOT NULL,
    equipment_type VARCHAR(50) NOT NULL,
    model VARCHAR(100),
    manufacturer VARCHAR(100),
    
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'idle', 'maintenance', 'offline')),
    
    -- Performance Metrics
    uptime_percentage DECIMAL(5,2) DEFAULT 100,
    efficiency_rating DECIMAL(5,2) DEFAULT 0,
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    
    -- Capacity
    max_capacity_per_hour DECIMAL(10,2),
    current_load DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_production_batches_status ON production_batches(status);
CREATE INDEX idx_production_batches_mill_id ON production_batches(mill_id);
CREATE INDEX idx_production_batches_batch_number ON production_batches(batch_number);
CREATE INDEX idx_production_batches_created_at ON production_batches(created_at);

CREATE INDEX idx_batch_stages_batch_id ON batch_stages(batch_id);
CREATE INDEX idx_batch_stages_status ON batch_stages(status);

CREATE INDEX idx_quality_checks_batch_id ON quality_checks(batch_id);
CREATE INDEX idx_quality_checks_checked_at ON quality_checks(checked_at);

CREATE INDEX idx_batch_alerts_batch_id ON batch_alerts(batch_id);
CREATE INDEX idx_batch_alerts_resolved ON batch_alerts(resolved);

CREATE INDEX idx_production_equipment_mill_id ON production_equipment(mill_id);
CREATE INDEX idx_production_equipment_status ON production_equipment(status);

-- RLS Policies
ALTER TABLE production_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_equipment ENABLE ROW LEVEL SECURITY;

-- Production Batches RLS
CREATE POLICY "Users can view production batches from their mill" ON production_batches
    FOR SELECT USING (
        mill_id IN (
            SELECT id FROM mills WHERE owner_id = auth.uid()
            OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Users can create production batches in their mill" ON production_batches
    FOR INSERT WITH CHECK (
        mill_id IN (
            SELECT id FROM mills WHERE owner_id = auth.uid()
            OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Users can update production batches in their mill" ON production_batches
    FOR UPDATE USING (
        mill_id IN (
            SELECT id FROM mills WHERE owner_id = auth.uid()
            OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
        )
    );

-- Batch Stages RLS
CREATE POLICY "Users can view batch stages from their mill" ON batch_stages
    FOR SELECT USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

CREATE POLICY "Users can manage batch stages in their mill" ON batch_stages
    FOR ALL USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

-- Quality Checks RLS
CREATE POLICY "Users can view quality checks from their mill" ON quality_checks
    FOR SELECT USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

CREATE POLICY "Users can manage quality checks in their mill" ON quality_checks
    FOR ALL USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

-- Batch Alerts RLS
CREATE POLICY "Users can view batch alerts from their mill" ON batch_alerts
    FOR SELECT USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

CREATE POLICY "Users can manage batch alerts in their mill" ON batch_alerts
    FOR ALL USING (
        batch_id IN (
            SELECT id FROM production_batches WHERE mill_id IN (
                SELECT id FROM mills WHERE owner_id = auth.uid()
                OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
            )
        )
    );

-- Production Equipment RLS
CREATE POLICY "Users can view equipment from their mill" ON production_equipment
    FOR SELECT USING (
        mill_id IN (
            SELECT id FROM mills WHERE owner_id = auth.uid()
            OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Users can manage equipment in their mill" ON production_equipment
    FOR ALL USING (
        mill_id IN (
            SELECT id FROM mills WHERE owner_id = auth.uid()
            OR id IN (SELECT mill_id FROM mill_users WHERE user_id = auth.uid())
        )
    );

-- Functions for automatic stage progression
CREATE OR REPLACE FUNCTION update_batch_stage_timing()
RETURNS TRIGGER AS $$
BEGIN
    -- When stage status changes to 'active', set start_time
    IF NEW.status = 'active' AND OLD.status != 'active' THEN
        NEW.start_time = NOW();
    END IF;
    
    -- When stage status changes to 'completed', set end_time and calculate duration
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        NEW.end_time = NOW();
        IF NEW.start_time IS NOT NULL THEN
            NEW.duration_minutes = EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 60;
        END IF;
    END IF;
    
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic stage timing
CREATE TRIGGER trigger_update_batch_stage_timing
    BEFORE UPDATE ON batch_stages
    FOR EACH ROW
    EXECUTE FUNCTION update_batch_stage_timing();

-- Function to auto-update batch status based on stages
CREATE OR REPLACE FUNCTION update_batch_status_from_stages()
RETURNS TRIGGER AS $$
DECLARE
    batch_rec RECORD;
    active_stages INTEGER;
    completed_stages INTEGER;
    total_stages INTEGER;
BEGIN
    -- Get batch information
    SELECT * INTO batch_rec FROM production_batches WHERE id = NEW.batch_id;
    
    -- Count stage statuses
    SELECT 
        COUNT(*) FILTER (WHERE status = 'active') as active_count,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
        COUNT(*) as total_count
    INTO active_stages, completed_stages, total_stages
    FROM batch_stages WHERE batch_id = NEW.batch_id;
    
    -- Update batch status based on stage progress
    IF completed_stages = total_stages THEN
        UPDATE production_batches 
        SET status = 'completed', actual_completion = NOW(), updated_at = NOW()
        WHERE id = NEW.batch_id;
    ELSIF active_stages > 0 THEN
        UPDATE production_batches 
        SET status = 'in_progress', updated_at = NOW()
        WHERE id = NEW.batch_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic batch status updates
CREATE TRIGGER trigger_update_batch_status_from_stages
    AFTER UPDATE ON batch_stages
    FOR EACH ROW
    WHEN (NEW.status != OLD.status)
    EXECUTE FUNCTION update_batch_status_from_stages();

-- Sample data
INSERT INTO production_equipment (equipment_name, equipment_type, mill_id, max_capacity_per_hour, uptime_percentage) 
SELECT 
    'Mill Unit ' || generate_series(1,3),
    'Rice Mill',
    (SELECT id FROM mills LIMIT 1),
    500.00,
    CASE 
        WHEN generate_series(1,3) = 1 THEN 98.5
        WHEN generate_series(1,3) = 2 THEN 100.0
        ELSE 0.0
    END
WHERE EXISTS (SELECT 1 FROM mills LIMIT 1);