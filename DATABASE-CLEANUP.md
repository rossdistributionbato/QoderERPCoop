# 🗑️ Database Cleanup Guide
# RiceMillOS Supabase Table Cleanup

## ⚠️ WARNING: Data Deletion

**This process will permanently delete ALL data in your Supabase database!**

- ✅ All tables will be dropped
- ✅ All data will be lost
- ✅ All policies will be removed
- ✅ All functions will be deleted
- ✅ Database will be completely clean

**Only proceed if you want to start fresh!**

---

## 🚀 Quick Cleanup (Recommended)

### Option 1: Automated Script
```bash
# Navigate to project directory
cd "c:\Users\HI\Documents\deve local\QoderERPCoop"

# Run cleanup script (requires Node.js)
npm run supabase:cleanup
```

**The script will:**
- Show you existing tables
- Ask for double confirmation
- Safely drop all RiceMillOS tables
- Provide cleanup summary

### Option 2: Manual Cleanup (SQL Editor)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/rwwubiimzkxmeqpwtsjn
   - Navigate to: **SQL Editor** → **New Query**

2. **Copy & Paste Cleanup Script**
   - Open file: `packages/database/cleanup-tables.sql`
   - **Copy entire content** (Ctrl+A, Ctrl+C)
   - **Paste into SQL Editor** (Ctrl+V)

3. **Execute Cleanup**
   - Click **"Run"** button
   - Wait for completion
   - Check for success message

4. **Verify Cleanup**
   - Go to **Table Editor**
   - Confirm no RiceMillOS tables remain
   - Only system tables should be present

---

## 🔍 What Gets Removed

### Tables Dropped:
- [x] `mills` - Rice mill information
- [x] `users` - User accounts and roles
- [x] `farmers` - Farmer database
- [x] `customers` - Customer management
- [x] `products` - Product catalog
- [x] `paddy_intakes` - Procurement records
- [x] `inventory_stock` - Inventory tracking
- [x] `sales_orders` - Sales management
- [x] `financial_transactions` - Financial records

### Security & Functions Removed:
- [x] All Row Level Security policies
- [x] All custom functions (`get_user_mill_id`, `get_user_role`)
- [x] All triggers and indexes
- [x] All custom types (`user_role`, `customer_type`, etc.)

### What Stays:
- ✅ Supabase system tables
- ✅ Authentication settings
- ✅ Project configuration
- ✅ Storage buckets (if any)

---

## 🔄 After Cleanup

### Immediate Next Steps:

1. **Verify Clean State**
   ```bash
   # Check if cleanup was successful
   # Go to Supabase Dashboard > Table Editor
   # Should see empty or only system tables
   ```

2. **Recreate Database Schema**
   ```bash
   # Apply fresh schema (recommended)
   # Use the setup-supabase.sql script
   ```

3. **Or Setup from Scratch**
   - Follow **[DATABASE-SETUP.md](./DATABASE-SETUP.md)** guide
   - Apply fresh schema from `packages/database/setup-supabase.sql`
   - Verify all tables are created correctly

---

## 🛠️ Troubleshooting

### Common Issues:

#### 1. **"Permission denied" error**
- **Cause**: Insufficient privileges
- **Solution**: Make sure you're using the Service Role key
- **Check**: Environment variables in `.env.local`

#### 2. **"Cannot drop table" error**
- **Cause**: Foreign key constraints
- **Solution**: The script handles this with CASCADE
- **Action**: Tables are dropped in correct order

#### 3. **"Table does not exist" error**
- **Cause**: Table already dropped or never existed
- **Solution**: This is normal and can be ignored
- **Result**: Cleanup continues successfully

#### 4. **Script hangs or fails**
- **Solution**: Use manual cleanup method
- **Alternative**: Copy SQL directly to Supabase SQL Editor
- **Fallback**: Drop tables individually in Dashboard

### Getting Help:
- Check Supabase Dashboard → **Logs** for detailed errors
- Review cleanup script output for specific issues
- Use manual method if automated script fails

---

## ⚡ Quick Commands

```bash
# Cleanup database
npm run supabase:cleanup

# Setup fresh database after cleanup
npm run supabase:setup

# Or manually apply schema
# Go to Supabase SQL Editor and run:
# packages/database/setup-supabase.sql
```

---

## 📋 Cleanup Checklist

Before running cleanup:
- [ ] **Backup important data** (if any exists)
- [ ] **Confirm you want to delete everything**
- [ ] **Have fresh schema ready** for recreation
- [ ] **Test credentials work** (check .env.local)

After cleanup:
- [ ] **Verify tables are gone** (Table Editor should be empty)
- [ ] **No RLS policies remain** (Authentication > Policies)
- [ ] **Ready for fresh setup** (clean slate achieved)

---

**🎯 Result: Your Supabase project will be completely clean and ready for fresh RiceMillOS setup!**

Ready to proceed? Choose your preferred cleanup method above.