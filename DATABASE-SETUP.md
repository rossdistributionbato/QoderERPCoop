# 🗄️ Database Setup Guide
# RiceMillOS Supabase Database Configuration

## ✅ Your Credentials
- **Project URL**: https://rwwubiimzkxmeqpwtsjn.supabase.co
- **Project Ref**: rwwubiimzkxmeqpwtsjn
- **Anon Key**: ✅ Configured
- **Service Role**: ✅ Configured

---

## 🚀 Quick Setup (Recommended)

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/rwwubiimzkxmeqpwtsjn
2. Navigate to: **SQL Editor** → **New Query**

### Step 2: Apply Database Schema
1. Open the file: `packages/database/setup-supabase.sql`
2. **Copy the entire content** (Ctrl+A, Ctrl+C)
3. **Paste into Supabase SQL Editor** (Ctrl+V)
4. Click **"Run"** button

### Step 3: Verify Setup
After running the script, you should see:
- ✅ **Tables created**: mills, users, farmers, customers, products, etc.
- ✅ **Sample data inserted**: Default products and demo mill
- ✅ **Security policies**: Row Level Security enabled
- ✅ **Success message**: "RiceMillOS database setup completed successfully! 🎉"

---

## 🔍 Verification Steps

### Check Tables
Go to **Table Editor** and verify these tables exist:
- [x] `mills` - Rice mill information
- [x] `users` - User accounts and roles  
- [x] `farmers` - Farmer database
- [x] `customers` - Customer management
- [x] `products` - Product catalog
- [x] `paddy_intakes` - Paddy procurement
- [x] `inventory_stock` - Inventory tracking
- [x] `sales_orders` - Sales management
- [x] `financial_transactions` - Financial records

### Check Sample Data
In **Table Editor** → **products**, you should see:
- Basmati Rice
- Non-Basmati Rice
- Broken Rice
- Rice Bran
- Rice Husk
- Paddy

### Check Security
In **Authentication** → **Policies**, you should see:
- RLS policies for all tables
- Multi-mill access control
- Role-based permissions

---

## 🛠️ Alternative Setup Methods

### Method 2: Automatic Script (if Node.js available)
```bash
# Install dependencies first
npm install

# Run setup script
npm run supabase:setup
```

### Method 3: Manual Table Creation
If you prefer to create tables one by one:
1. Use the individual CREATE TABLE statements from `setup-supabase.sql`
2. Apply them one section at a time
3. Test each section before proceeding

---

## 🔧 Troubleshooting

### Common Issues:

#### 1. **"Permission denied" error**
- **Solution**: Make sure you're using the Service Role key, not the Anon key
- **Check**: Environment variables are properly set

#### 2. **"Type does not exist" error**
- **Solution**: Run the CREATE TYPE statements first
- **Order**: Types → Tables → Indexes → Policies

#### 3. **"Relation already exists" error**
- **Solution**: This is normal if re-running the script
- **Action**: You can ignore these warnings

#### 4. **"Function get_user_mill_id() does not exist"**
- **Solution**: Make sure the helper functions are created before policies
- **Fix**: Run the CREATE FUNCTION statements

### Getting Help:
1. Check Supabase Dashboard → **Logs** for detailed errors
2. Visit Supabase Discord or documentation
3. Check the project issues on GitHub

---

## 🎯 Next Steps After Database Setup

### 1. Verify Connection
```bash
# Test if your app can connect to database
npm run dev
# Visit: http://localhost:3000
```

### 2. Create First User
1. Go to your local app
2. Click "Get Started" 
3. Register a new account
4. User will be automatically added to the `users` table

### 3. Start Development
- Follow the TODO.md roadmap
- Begin with Week 3-4: Authentication & User Management
- Start building the farmer management module

---

## 📊 Database Schema Overview

```
Mills (Rice Mill Operations)
  ├── Users (Staff & Operators)
  ├── Farmers (Paddy Suppliers)
  │   └── Paddy Intakes (Procurement)
  ├── Customers (Rice Buyers)
  │   └── Sales Orders (Sales)
  ├── Products (Rice, Bran, Husk)
  │   └── Inventory Stock (Stock Levels)
  └── Financial Transactions (Payments)
```

### Key Features:
- **Multi-Mill Support**: Each mill has isolated data
- **Role-Based Access**: Different permissions per user role
- **Real-Time Ready**: Optimized for live updates
- **Mobile Optimized**: Efficient queries for mobile apps
- **Financial Accuracy**: Double-entry accounting support

---

**🎉 Your RiceMillOS database is now ready for development!**

Once the database is set up, you can start building the application features following the implementation roadmap in TODO.md.