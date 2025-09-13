# =====================================================
# CLEANUP SCRIPT RUNNER
# =====================================================
# This script runs the database cleanup on both local and remote databases

Write-Host "=== RiceMillOS Database Cleanup ===" -ForegroundColor Green

Write-Host "`nChoose cleanup option:" -ForegroundColor Yellow
Write-Host "1. Complete cleanup (removes ALL tables and objects)" -ForegroundColor Red
Write-Host "2. Targeted cleanup (removes only RiceMillOS tables)" -ForegroundColor Yellow
Write-Host "3. Exit without cleanup" -ForegroundColor Cyan

$choice = Read-Host "`nEnter your choice (1, 2, or 3)"

switch ($choice) {
    "1" {
        Write-Host "`nRunning COMPLETE cleanup..." -ForegroundColor Red
        Write-Host "This will remove ALL tables, functions, and objects!" -ForegroundColor Red
        $confirm = Read-Host "Are you sure? Type 'YES' to continue"
        
        if ($confirm -eq "YES") {
            Write-Host "`nCleaning LOCAL database..." -ForegroundColor Yellow
            Get-Content "supabase\cleanup_old_tables.sql" | npx supabase db exec
            
            Write-Host "`nCleaning REMOTE database..." -ForegroundColor Yellow
            Get-Content "supabase\cleanup_old_tables.sql" | npx supabase db remote exec
            
            Write-Host "`nComplete cleanup finished!" -ForegroundColor Green
        } else {
            Write-Host "Cleanup cancelled." -ForegroundColor Yellow
        }
    }
    "2" {
        Write-Host "`nRunning TARGETED cleanup..." -ForegroundColor Yellow
        Write-Host "This will remove only RiceMillOS tables and related objects." -ForegroundColor Yellow
        
        Write-Host "`nCleaning LOCAL database..." -ForegroundColor Yellow
        Get-Content "supabase\cleanup_ricemillos_tables.sql" | npx supabase db exec
        
        Write-Host "`nCleaning REMOTE database..." -ForegroundColor Yellow
        Get-Content "supabase\cleanup_ricemillos_tables.sql" | npx supabase db remote exec
        
        Write-Host "`nTargeted cleanup finished!" -ForegroundColor Green
    }
    "3" {
        Write-Host "Exiting without cleanup." -ForegroundColor Cyan
        exit
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit
    }
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Run: npx supabase db reset (to apply fresh migrations)"
Write-Host "2. Run: npm run dev (to start development server)"
Write-Host "3. Verify: http://localhost:3001 (check application)"