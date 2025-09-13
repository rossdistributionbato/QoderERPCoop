# 🗄️ Supabase CLI Migration Guide
# RiceMillOS Database Management with Supabase CLI

## 📋 Prerequisites

### Install Supabase CLI
```bash
# Install via npm (global)
npm install -g supabase

# Or install via package.json (already included)
npm install

# Verify installation
supabase --version
```

### Required Tools
- **Node.js 18+** (for local development)
- **Docker** (for local Supabase instance)
- **Git** (for version control)

---

## 🚀 Quick Start

### 1. Link to Your Remote Project
```bash
# Navigate to project root
cd "c:\Users\HI\Documents\deve local\QoderERPCoop"

# Link to your Supabase project
npm run supabase:link
# This connects to: rwwubiimzkxmeqpwtsjn.supabase.co
```

### 2. Deploy Migrations to Remote Database
```bash
# Push all migrations to your remote Supabase project
npm run supabase:deploy
```

### 3. Start Local Development (Optional)
```bash
# Start local Supabase stack
npm run supabase:start

# Check status
npm run supabase:status

# Access local Supabase Studio
npm run supabase:studio
```

---

## 📁 Migration Files Structure

Your migrations are organized in chronological order:

```
supabase/migrations/
├── 20250913000001_create_types.sql          # Custom PostgreSQL types
├── 20250913000002_create_core_tables.sql    # Core tables (mills, users, farmers, etc.)
├── 20250913000003_create_operational_tables.sql # Operational tables (intakes, orders, etc.)
├── 20250913000004_create_indexes.sql        # Performance indexes
├── 20250913000005_enable_rls_and_functions.sql # RLS setup and helper functions
├── 20250913000006_create_rls_policies.sql   # Row Level Security policies
└── 20250913000007_create_triggers_and_sample_data.sql # Triggers and sample data
```

---

## 🔧 Common Commands

### Migration Management
```bash
# Create a new migration
npm run supabase:migrate:new "add_new_feature"

# Apply migrations locally
npm run supabase:migrate:up

# Push migrations to remote (production)
npm run supabase:deploy

# Reset local database (WARNING: deletes all local data)
npm run supabase:reset
```

### Development Workflow
```bash
# Start local development
npm run supabase:start

# Generate TypeScript types from schema
npm run supabase:generate

# Open Supabase Studio
npm run supabase:studio

# Check local services status
npm run supabase:status

# Stop local services
npm run supabase:stop
```

### Database Operations
```bash
# Apply migrations to remote database
npm run supabase:migrate

# Run seed data (development)
npm run db:seed

# Generate fresh types after schema changes
npm run supabase:generate
```

---

## 🎯 Step-by-Step Migration Process

### Option 1: Deploy to Remote Database (Recommended)

1. **Link to Remote Project**
   ```bash
   npm run supabase:link
   ```

2. **Deploy All Migrations**
   ```bash
   npm run supabase:deploy
   ```

3. **Verify in Dashboard**
   - Go to: https://supabase.com/dashboard/project/rwwubiimzkxmeqpwtsjn
   - Check **Table Editor** for created tables
   - Verify **Authentication > Policies** for RLS policies

4. **Generate Types for Development**
   ```bash
   npm run supabase:generate
   ```

### Option 2: Local Development Setup

1. **Start Local Supabase**
   ```bash
   npm run supabase:start
   ```
   
   This starts:
   - **API**: http://localhost:54321
   - **DB**: localhost:54322  
   - **Studio**: http://localhost:54323
   - **Inbucket**: http://localhost:54324 (email testing)

2. **Apply Migrations Locally**
   ```bash
   npm run supabase:reset  # Fresh start
   ```

3. **Generate TypeScript Types**
   ```bash
   npm run supabase:generate
   ```

4. **Access Local Studio**
   ```bash
   npm run supabase:studio
   ```

---

## 📊 What Gets Created

### Database Objects Created:

#### **Custom Types:**
- `user_role` - User permission levels
- `customer_type` - Customer categories  
- `unit_type` - Measurement units
- `payment_method` - Payment options

#### **Core Tables:**
- `mills` - Rice mill information
- `users` - User accounts (extends Supabase auth)
- `farmers` - Farmer database
- `customers` - Customer management
- `products` - Product catalog

#### **Operational Tables:**
- `paddy_intakes` - Procurement records
- `inventory_stock` - Stock levels
- `sales_orders` - Sales management
- `financial_transactions` - Financial records

#### **Security & Performance:**
- **Row Level Security (RLS)** on all tables
- **Performance indexes** for fast queries
- **Helper functions** for multi-mill access
- **Audit triggers** for data tracking

#### **Sample Data:**
- Default rice products (Basmati, Non-Basmati, Bran, etc.)
- Demo mill for testing
- Sample configurations

---

## 🔍 Verification Steps

### After Migration, Check:

1. **Tables Created**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **RLS Policies Active**
   ```sql
   -- Check RLS policies
   SELECT schemaname, tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

3. **Sample Data Present**
   ```sql
   -- Check products
   SELECT name, code FROM products;
   
   -- Check demo mill
   SELECT name, license_number FROM mills;
   ```

4. **Functions Created**
   ```sql
   -- Check helper functions
   SELECT routine_name 
   FROM information_schema.routines 
   WHERE routine_schema = 'public';
   ```

---

## 🛠️ Troubleshooting

### Common Issues:

#### 1. **"Project not linked" error**
```bash
# Solution: Link to your project first
npm run supabase:link
```

#### 2. **"Migration failed" error**
```bash
# Check migration file syntax
# Ensure foreign key references are correct
# Verify types are created before tables
```

#### 3. **"Permission denied" error**
```bash
# Ensure you're logged into Supabase CLI
supabase login
# Verify project access permissions
```

#### 4. **"Function already exists" error**
```bash
# Normal when re-running migrations
# Functions use CREATE OR REPLACE
# Can be safely ignored
```

### Recovery Commands:
```bash
# Reset everything and start fresh
npm run supabase:reset

# Re-apply specific migration
supabase migration up --include-all

# Check migration status
supabase migration list
```

---

## 📋 Migration Checklist

### Before Running Migrations:
- [ ] **Supabase CLI installed** and logged in
- [ ] **Project linked** to remote Supabase
- [ ] **Backup existing data** (if any)
- [ ] **Review migration files** for accuracy

### After Running Migrations:
- [ ] **Verify all tables created** (9 core tables)
- [ ] **Check RLS policies active** (multi-mill security)
- [ ] **Confirm sample data inserted** (products, demo mill)
- [ ] **Generate TypeScript types** for development
- [ ] **Test basic CRUD operations** in Studio

### Development Setup:
- [ ] **Start frontend development** server
- [ ] **Configure environment** variables
- [ ] **Test authentication** flow
- [ ] **Verify database** connections work

---

## 🎯 Next Steps After Migration

1. **Start Development Server**
   ```bash
   # Navigate to web app
   cd apps/web
   npm install
   npm run dev
   ```

2. **Test Database Connection**
   - Visit: http://localhost:3000
   - Try user registration
   - Verify data appears in Supabase

3. **Continue Development**
   - Follow [TODO.md](./TODO.md) roadmap
   - Start with Week 3-4: Authentication & User Management
   - Build farmer management module

4. **Monitor & Maintain**
   - Use Supabase Studio for data management
   - Create additional migrations as needed
   - Keep types synchronized with schema changes

---

## 🚀 Advanced Usage

### Creating New Migrations
```bash
# Create new migration file
npm run supabase:migrate:new "add_user_preferences"

# Edit the generated file
# Example: supabase/migrations/20250913123456_add_user_preferences.sql

# Apply new migration
npm run supabase:deploy
```

### Schema Diffing
```bash
# Compare local vs remote schema
supabase db diff --linked

# Generate migration from diff
supabase db diff --linked | supabase migration new --name "sync_changes"
```

### Backup & Restore
```bash
# Create database backup
supabase db dump --linked > backup.sql

# Restore from backup (local)
supabase db reset
psql -h localhost -p 54322 -U postgres < backup.sql
```

---

**🎉 Your RiceMillOS database is now managed with professional-grade migrations!**

This setup ensures:
- ✅ **Version-controlled** database changes
- ✅ **Reproducible** deployments
- ✅ **Team collaboration** friendly
- ✅ **Production-ready** schema management