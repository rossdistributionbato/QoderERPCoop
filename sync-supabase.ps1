# Supabase Sync Script
# Run each command step by step

Write-Host "=== Supabase Remote Sync Process ===" -ForegroundColor Green

Write-Host "`n1. First, login to Supabase (if not already done):" -ForegroundColor Yellow
Write-Host "npx supabase login"

Write-Host "`n2. Link local project to remote:" -ForegroundColor Yellow
Write-Host "npx supabase link --project-ref rwwubiimzkxmeqpwtsjn"

Write-Host "`n3. Check current migration status:" -ForegroundColor Yellow
Write-Host "npx supabase db diff"

Write-Host "`n4. Push local migrations to remote:" -ForegroundColor Yellow
Write-Host "npx supabase db push"

Write-Host "`n5. Verify remote database structure:" -ForegroundColor Yellow
Write-Host "npx supabase db remote list"

Write-Host "`n=== Manual Steps Required ===" -ForegroundColor Cyan
Write-Host "Please run these commands one by one in your terminal:"
Write-Host "1. Press Enter in the terminal where 'npx supabase login' is waiting"
Write-Host "2. Complete the browser authentication"
Write-Host "3. Then run the remaining commands"