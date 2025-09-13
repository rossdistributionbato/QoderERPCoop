#!/usr/bin/env node

/**
 * YOLO Test Runner
 * Attempts to run tests in multiple ways and reports results
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 YOLO MODE: Testing Infrastructure Verification');
console.log('=' .repeat(60));

// Check if we're in the right directory
const currentDir = process.cwd();
console.log(`📁 Current directory: ${currentDir}`);

// Check for package.json
if (!fs.existsSync('package.json')) {
  console.log('❌ package.json not found in current directory');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log(`📦 Project: ${packageJson.name}`);

// Test infrastructure files check
console.log('\n🔍 Checking test infrastructure...');

const testFiles = [
  'jest.config.js',
  'jest.setup.js',
  'src/__tests__/setup.test.ts',
  'src/test/test-utils.tsx',
  'src/components/farmers/__tests__/FarmerList.test.tsx',
  'src/components/procurement/__tests__/PaddyIntakeForm.test.tsx',
];

testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} (missing)`);
  }
});

// Check dependencies
console.log('\n📦 Checking test dependencies...');

const requiredDeps = [
  'jest',
  'ts-jest',
  '@testing-library/react',
  '@testing-library/jest-dom',
  '@testing-library/user-event'
];

const installedDeps = {
  ...packageJson.dependencies || {},
  ...packageJson.devDependencies || {}
};

requiredDeps.forEach(dep => {
  if (installedDeps[dep]) {
    console.log(`✅ ${dep} (${installedDeps[dep]})`);
  } else {
    console.log(`❌ ${dep} (not installed)`);
  }
});

// Try different test running approaches
console.log('\n🧪 Testing different approaches...');

async function tryTestApproach(name, command) {
  console.log(`\n🔄 Trying: ${name}`);
  console.log(`Command: ${command}`);
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    try {
      const result = execSync(command, { 
        stdio: 'pipe',
        timeout: 30000,
        encoding: 'utf8'
      });
      
      const duration = Date.now() - startTime;
      console.log(`✅ ${name} - Success (${duration}ms)`);
      console.log('Output:', result.slice(0, 200) + (result.length > 200 ? '...' : ''));
      resolve({ success: true, output: result, duration });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`❌ ${name} - Failed (${duration}ms)`);
      console.log('Error:', error.message.slice(0, 200));
      resolve({ success: false, error: error.message, duration });
    }
  });
}

async function runTests() {
  const approaches = [
    ['Basic Jest', 'npx jest --version'],
    ['Jest with config', 'npx jest --config jest.config.js --passWithNoTests'],
    ['Simple test file', 'npx jest src/__tests__/setup.test.ts'],
    ['NPM test script', 'npm test'],
    ['TypeScript check', 'npx tsc --noEmit'],
  ];

  const results = [];

  for (const [name, command] of approaches) {
    const result = await tryTestApproach(name, command);
    results.push({ name, ...result });
  }

  // Summary
  console.log('\n📊 RESULTS SUMMARY');
  console.log('=' .repeat(60));
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name} (${result.duration}ms)`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Success Rate: ${successCount}/${results.length}`);

  if (successCount > 0) {
    console.log('🎉 Some tests are working! The infrastructure is partially functional.');
  } else {
    console.log('⚠️ No tests ran successfully. Environment setup needed.');
  }
}

// Run the test verification
runTests().catch(console.error);