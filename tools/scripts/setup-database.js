#!/usr/bin/env node

/**
 * Database Setup Script for RiceMillOS
 * This script applies the database schema to your Supabase project
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

async function setupDatabase() {
  console.log('🚀 Setting up RiceMillOS database...');
  console.log(`📡 Connecting to: ${supabaseUrl}`);

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '../../packages/database/schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found:', schemaPath);
      process.exit(1);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      
      try {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        
        const { error } = await supabase.rpc('exec_sql', {
          query: statement
        });

        if (error) {
          console.warn(`⚠️  Warning on statement ${i + 1}:`, error.message);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.warn(`⚠️  Error on statement ${i + 1}:`, err.message);
        errorCount++;
      }
    }

    console.log('\n📊 Database Setup Summary:');
    console.log(`✅ Successful statements: ${successCount}`);
    console.log(`⚠️  Warnings/Errors: ${errorCount}`);

    // Test the setup by checking if tables exist
    console.log('\n🔍 Verifying database setup...');
    
    const tables = ['mills', 'users', 'farmers', 'customers', 'products', 'paddy_intakes'];
    let verifiedTables = 0;

    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });

        if (!error) {
          console.log(`✅ Table '${table}' is ready`);
          verifiedTables++;
        } else {
          console.log(`❌ Table '${table}' not accessible:`, error.message);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' error:`, err.message);
      }
    }

    console.log(`\n📈 Verified ${verifiedTables}/${tables.length} core tables`);

    if (verifiedTables === tables.length) {
      console.log('\n🎉 Database setup completed successfully!');
      console.log('🔗 You can now access your Supabase dashboard at:');
      console.log(`   ${supabaseUrl.replace('/rest/v1', '')}`);
      console.log('\n🚀 Next steps:');
      console.log('   1. Install dependencies: npm install');
      console.log('   2. Start development: npm run dev');
      console.log('   3. Visit: http://localhost:3000');
    } else {
      console.log('\n⚠️  Database setup completed with some issues.');
      console.log('   Please check the Supabase dashboard and logs.');
    }

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Manual schema application function (fallback)
async function manualSetup() {
  console.log('\n📝 Manual Setup Instructions:');
  console.log('Since automatic setup may have issues, please follow these steps:');
  console.log('');
  console.log('1. Open your Supabase dashboard:');
  console.log(`   ${supabaseUrl.replace('/rest/v1', '')}`);
  console.log('');
  console.log('2. Navigate to: SQL Editor > New Query');
  console.log('');
  console.log('3. Copy and paste the schema from:');
  console.log('   packages/database/schema.sql');
  console.log('');
  console.log('4. Click "Run" to execute the schema');
  console.log('');
  console.log('5. Verify tables are created in Table Editor');
  console.log('');
  console.log('✨ This will create all the necessary tables and security policies!');
}

// Run the setup
if (require.main === module) {
  setupDatabase().catch(() => {
    console.log('\n🔧 Automatic setup encountered issues.');
    manualSetup();
  });
}

module.exports = { setupDatabase, manualSetup };