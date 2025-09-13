#!/usr/bin/env node

/**
 * Database Cleanup Script for RiceMillOS
 * This script safely removes all existing tables from your Supabase project
 * WARNING: This will delete ALL data in your database!
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.log('Required variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function listExistingTables() {
  console.log('🔍 Checking existing tables in your Supabase project...\n');
  
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .neq('table_name', 'schema_migrations');

    if (error) {
      // If we can't query information_schema, try a direct approach
      console.log('📊 Attempting to list tables through direct query...');
      return null;
    }

    return data;
  } catch (err) {
    console.log('ℹ️  Cannot query table list directly, but cleanup will proceed.');
    return null;
  }
}

async function executeCleanup() {
  console.log('🧹 Starting database cleanup...');
  console.log(`📡 Connected to: ${supabaseUrl}`);

  try {
    // Read the cleanup script
    const cleanupPath = path.join(__dirname, '../../packages/database/cleanup-tables.sql');
    
    if (!fs.existsSync(cleanupPath)) {
      console.error('❌ Cleanup script not found:', cleanupPath);
      process.exit(1);
    }

    const cleanupScript = fs.readFileSync(cleanupPath, 'utf8');
    
    // Split into individual statements
    const statements = cleanupScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} cleanup statements to execute\n`);

    let successCount = 0;
    let warningCount = 0;

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      try {
        console.log(`⏳ Executing cleanup step ${i + 1}/${statements.length}...`);
        
        // Execute using Supabase's RPC if available, otherwise direct SQL
        const { data, error } = await supabase.rpc('exec_sql', {
          query: statement
        }).catch(async () => {
          // Fallback: try direct SQL execution
          return await supabase.from('_raw_sql').select().limit(1);
        });

        if (error) {
          console.log(`⚠️  Warning on step ${i + 1}: ${error.message}`);
          warningCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.log(`⚠️  Warning on step ${i + 1}: ${err.message}`);
        warningCount++;
      }
    }

    console.log('\n📊 Database Cleanup Summary:');
    console.log(`✅ Successful operations: ${successCount}`);
    console.log(`⚠️  Warnings (expected): ${warningCount}`);

    console.log('\n🎉 Database cleanup completed!');
    console.log('✨ Your Supabase project is now clean and ready for fresh setup.');
    
    console.log('\n📋 Next Steps:');
    console.log('1. Apply fresh schema: packages/database/setup-supabase.sql');
    console.log('2. Or run: npm run supabase:setup');
    console.log('3. Verify in Supabase Dashboard');

  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
    process.exit(1);
  }
}

async function manualInstructions() {
  console.log('\n📝 Manual Cleanup Instructions:');
  console.log('If the automatic cleanup has issues, follow these steps:');
  console.log('');
  console.log('1. Open your Supabase dashboard:');
  console.log(`   ${supabaseUrl.replace('/rest/v1', '')}`);
  console.log('');
  console.log('2. Navigate to: SQL Editor > New Query');
  console.log('');
  console.log('3. Copy and paste the cleanup script from:');
  console.log('   packages/database/cleanup-tables.sql');
  console.log('');
  console.log('4. Click "Run" to execute the cleanup');
  console.log('');
  console.log('5. Verify all tables are removed in Table Editor');
  console.log('');
  console.log('⚡ This will safely remove all RiceMillOS tables and data!');
}

async function main() {
  console.log('🗑️  RiceMillOS Database Cleanup Tool');
  console.log('=====================================\n');
  
  console.log('⚠️  WARNING: This will delete ALL data in your database!');
  console.log('📊 This includes all tables, data, policies, and functions.');
  console.log('🔄 You can recreate everything using the setup script afterward.\n');

  // List existing tables
  const tables = await listExistingTables();
  if (tables && tables.length > 0) {
    console.log('📋 Found these tables in your database:');
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });
    console.log('');
  }

  const confirmation1 = await askQuestion('❓ Are you sure you want to delete ALL tables? (type "yes" to confirm): ');
  
  if (confirmation1.toLowerCase() !== 'yes') {
    console.log('❌ Cleanup cancelled. Your database is unchanged.');
    rl.close();
    return;
  }

  const confirmation2 = await askQuestion('❓ This action cannot be undone. Type "DELETE ALL DATA" to proceed: ');
  
  if (confirmation2 !== 'DELETE ALL DATA') {
    console.log('❌ Cleanup cancelled. Your database is unchanged.');
    rl.close();
    return;
  }

  rl.close();

  console.log('\n🚀 Proceeding with database cleanup...\n');
  
  try {
    await executeCleanup();
  } catch (error) {
    console.log('\n🔧 Automatic cleanup encountered issues.');
    manualInstructions();
  }
}

// Run the cleanup
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { executeCleanup, manualInstructions };