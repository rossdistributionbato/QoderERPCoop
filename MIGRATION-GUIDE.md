# RiceMillOS Database Migration Guide

## 🚀 Quick Deploy Options

### Option 1: Manual SQL Execution (Recommended - Always Works)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `rwwubiimzkxmeqpwtsjn`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Execute Migration Script**
   - Open the file: `supabase/complete_migration.sql`
   - Copy ALL contents (560+ lines)
   - Paste into the SQL Editor
   - Click "Run" button

4. **Verify Tables Created**
   - Go to "Table Editor" in dashboard
   - You should see 9 tables: mills, users, farmers, customers, products, paddy_intakes, inventory_stock, sales_orders, financial_transactions

### Option 2: Supabase CLI (After Installing Node.js)

```powershell
# 1. Install Node.js (if not already installed)
# Download from: https://nodejs.org/en/download/
# Or use winget: winget install OpenJS.NodeJS

# 2. Install Supabase CLI
npm install -g supabase

# 3. Navigate to project
cd "c:\Users\HI\Documents\deve local\QoderERPCoop"

# 4. Initialize Supabase (if not done)
supabase init

# 5. Link to your project
supabase link --project-ref rwwubiimzkxmeqpwtsjn

# 6. Deploy migrations
supabase db push --linked

# 7. Generate TypeScript types
supabase gen types typescript --linked > packages/shared/src/types/supabase.ts
```

## 📋 What Gets Created

### Custom Types (4)
- `user_role` - super_admin, mill_owner, manager, operator, accountant
- `customer_type` - wholesaler, retailer, direct_consumer, institutional, export
- `unit_type` - kg, quintal, ton, bag  
- `payment_method` - cash, bank_transfer, upi, cheque, card

### Core Tables (9)
1. **mills** - Rice mill information
2. **users** - User accounts (extends Supabase auth)
3. **farmers** - Farmer master data
4. **customers** - Customer master data
5. **products** - Product catalog
6. **paddy_intakes** - Paddy purchase records
7. **inventory_stock** - Current stock levels
8. **sales_orders** - Sales transactions
9. **financial_transactions** - All financial movements

### Security Features
- **Row Level Security (RLS)** enabled on all tables
- **Multi-tenant isolation** by mill_id
- **Role-based access control** (super_admin, mill_owner, manager, operator, accountant)
- **21 RLS policies** for fine-grained access control

### Performance Features
- **16 indexes** including composite and partial indexes
- **Full-text search** indexes for farmers and customers
- **Timestamp triggers** for audit trails
- **Generated columns** for calculated fields

### Sample Data
- **6 default products** (Basmati Rice, Non-Basmati Rice, Broken Rice, Rice Bran, Rice Husk, Paddy)
- **1 demo mill** for development and testing

## 🔧 Available Commands (After CLI Setup)

```powershell
# Project management
npm run supabase:status          # Check status
npm run supabase:studio          # Open local studio
npm run supabase:link            # Link to remote project
npm run supabase:deploy          # Deploy to remote

# Migration management  
npm run supabase:migrate         # Push migrations
npm run supabase:migrate:new     # Create new migration
npm run supabase:generate        # Generate TypeScript types

# Local development
npm run supabase:start           # Start local Supabase
npm run supabase:stop            # Stop local Supabase
npm run supabase:reset           # Reset local database
```

## ✅ Verification Steps

After running the migration, verify in Supabase Dashboard:

1. **Tables Created**: 9 tables with proper relationships
2. **Sample Data**: Products and demo mill inserted
3. **Security**: RLS enabled and policies active
4. **Functions**: Helper functions for RLS created
5. **Indexes**: Performance indexes created

## 🎯 Next Development Steps

After successful migration:

1. **Week 3-4**: Authentication & User Management
   - Implement Supabase Auth integration
   - Create user registration/login flows
   - Set up role-based access control

2. **Week 5-6**: Farmer Management Module
   - Farmer registration and profile management
   - Search and filter functionality

3. **Week 7-8**: Procurement & Paddy Intake
   - Paddy intake forms and calculations
   - Quality assessment workflows

4. **Week 9-10**: Inventory Management
   - Stock tracking and alerts
   - Product movement records

## 🆘 Troubleshooting

If you encounter issues:

1. **Permission Errors**: Make sure you're project owner in Supabase
2. **Connection Issues**: Verify your project reference and API keys
3. **Migration Fails**: Use manual SQL execution method
4. **CLI Not Found**: Install Node.js first, then Supabase CLI

## 📞 Support

For issues with this migration:
- Check Supabase Dashboard logs
- Verify environment variables in `.env.local`
- Ensure your Supabase project is active and accessible