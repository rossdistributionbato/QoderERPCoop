#!/usr/bin/env pwsh

# 🚀 RiceMillOS Quick Command Reference
Write-Host "=== 🌾 RiceMillOS Quick Commands ===" -ForegroundColor Green

Write-Host "`n🏗️  DEVELOPMENT" -ForegroundColor Cyan
Write-Host "npm run dev                    # Start local development" -ForegroundColor White
Write-Host "npm run docker:dev             # Start Docker environment" -ForegroundColor White
Write-Host "npm run docker:dev:logs        # View Docker logs" -ForegroundColor White

Write-Host "`n🗄️  SUPABASE" -ForegroundColor Cyan  
Write-Host "npm run supabase:start         # Start local Supabase" -ForegroundColor White
Write-Host "npm run supabase:status        # Check status" -ForegroundColor White
Write-Host "npm run supabase:deploy        # Deploy to remote" -ForegroundColor White
Write-Host "npm run supabase:generate      # Generate TypeScript types" -ForegroundColor White

Write-Host "`n🌐 NETLIFY" -ForegroundColor Cyan
Write-Host "netlify login                  # Login to Netlify" -ForegroundColor White
Write-Host "netlify init                   # Initialize project" -ForegroundColor White
Write-Host "netlify deploy                 # Deploy to preview" -ForegroundColor White
Write-Host "netlify deploy --prod --build  # Deploy to production" -ForegroundColor White

Write-Host "`n🔧 BUILD AND TEST" -ForegroundColor Cyan
Write-Host "npm run build                  # Build all apps" -ForegroundColor White
Write-Host "npm run test                   # Run all tests" -ForegroundColor White
Write-Host "npm run lint                   # Check code quality" -ForegroundColor White

Write-Host "`n🚀 ACCESS POINTS" -ForegroundColor Cyan
Write-Host "Local App:      http://localhost:3000" -ForegroundColor White
Write-Host "Supabase Studio: http://127.0.0.1:54323" -ForegroundColor White
Write-Host "Docker PgAdmin:  http://localhost:5050" -ForegroundColor White

Write-Host "`n💡 QUICK WORKFLOW" -ForegroundColor Yellow
Write-Host "1. npm run supabase:start      # Start database" -ForegroundColor White
Write-Host "2. npm run dev                 # Start development" -ForegroundColor White
Write-Host "3. netlify deploy --prod       # Deploy when ready" -ForegroundColor White

Write-Host "`nFull cheat sheet: COMMAND-CHEAT-SHEET.md" -ForegroundColor Blue