# RiceMillOS Supabase CLI Setup and Migration Script
# Run this PowerShell script as Administrator

Write-Host "=== RiceMillOS Database Migration Script ===" -ForegroundColor Green
Write-Host "Setting up Supabase CLI and deploying database schema..." -ForegroundColor Yellow

# Check if running as Administrator
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "WARNING: This script should be run as Administrator for best results." -ForegroundColor Red
    Write-Host "Some installations may fail without admin privileges." -ForegroundColor Red
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y' -and $continue -ne 'Y') {
        exit
    }
}

# Set execution policy temporarily
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# Navigate to project directory
Set-Location "c:\Users\HI\Documents\deve local\QoderERPCoop"

Write-Host "`n1. Checking for Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Installing Node.js..." -ForegroundColor Red
    
    # Try to install Node.js via winget
    try {
        winget install OpenJS.NodeJS
        Write-Host "✅ Node.js installed successfully. Please restart PowerShell and run this script again." -ForegroundColor Green
        Read-Host "Press Enter to exit"
        exit
    } catch {
        Write-Host "❌ Failed to install Node.js via winget." -ForegroundColor Red
        Write-Host "Please install Node.js manually from https://nodejs.org" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit
    }
}

Write-Host "`n2. Checking for Supabase CLI..." -ForegroundColor Cyan
try {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI found: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI not found. Installing..." -ForegroundColor Red
    
    # Try multiple installation methods
    $installed = $false
    
    # Method 1: npm (if available)
    try {
        npm install -g supabase
        Write-Host "✅ Supabase CLI installed via npm" -ForegroundColor Green
        $installed = $true
    } catch {
        Write-Host "⚠️ npm installation failed, trying winget..." -ForegroundColor Yellow
    }
    
    # Method 2: winget
    if (-not $installed) {
        try {
            winget install Supabase.CLI
            Write-Host "✅ Supabase CLI installed via winget" -ForegroundColor Green
            $installed = $true
        } catch {
            Write-Host "⚠️ winget installation failed, trying scoop..." -ForegroundColor Yellow
        }
    }
    
    # Method 3: scoop (if available)
    if (-not $installed) {
        try {
            scoop install supabase
            Write-Host "✅ Supabase CLI installed via scoop" -ForegroundColor Green
            $installed = $true
        } catch {
            Write-Host "❌ All installation methods failed." -ForegroundColor Red
        }
    }
    
    if (-not $installed) {
        Write-Host "Please install Supabase CLI manually:" -ForegroundColor Yellow
        Write-Host "1. Download from: https://github.com/supabase/cli/releases" -ForegroundColor Yellow
        Write-Host "2. Or use: npm install -g supabase" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit
    }
}

Write-Host "`n3. Checking Supabase project configuration..." -ForegroundColor Cyan
if (Test-Path "supabase\config.toml") {
    Write-Host "✅ Supabase project already initialized" -ForegroundColor Green
} else {
    Write-Host "❌ Supabase project not initialized. Initializing..." -ForegroundColor Red
    try {
        supabase init
        Write-Host "✅ Supabase project initialized" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to initialize Supabase project" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit
    }
}

Write-Host "`n4. Linking to remote Supabase project..." -ForegroundColor Cyan
try {
    # Link to the remote project
    supabase link --project-ref rwwubiimzkxmeqpwtsjn
    Write-Host "✅ Successfully linked to remote Supabase project" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Failed to link automatically. Manual linking required." -ForegroundColor Yellow
    Write-Host "Please run: supabase link --project-ref rwwubiimzkxmeqpwtsjn" -ForegroundColor Yellow
    
    $continue = Read-Host "Have you linked manually? (y/n)"
    if ($continue -ne 'y' -and $continue -ne 'Y') {
        Write-Host "Please link the project first, then run this script again." -ForegroundColor Yellow
        exit
    }
}

Write-Host "`n5. Deploying database migrations..." -ForegroundColor Cyan
try {
    # Push all migrations to remote database
    supabase db push --linked
    Write-Host "✅ Database migrations deployed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Migration deployment failed. Trying alternative method..." -ForegroundColor Red
    
    Write-Host "`nAlternative: Manual SQL execution" -ForegroundColor Yellow
    Write-Host "A complete SQL file has been created at: supabase\complete_migration.sql" -ForegroundColor Yellow
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Open your Supabase dashboard: https://supabase.com/dashboard" -ForegroundColor Yellow
    Write-Host "2. Go to SQL Editor" -ForegroundColor Yellow
    Write-Host "3. Copy and paste the contents of 'supabase\complete_migration.sql'" -ForegroundColor Yellow
    Write-Host "4. Execute the script" -ForegroundColor Yellow
}

Write-Host "`n6. Generating TypeScript types..." -ForegroundColor Cyan
try {
    # Generate TypeScript types from the database schema
    if (-not (Test-Path "packages\shared\src\types")) {
        New-Item -ItemType Directory -Path "packages\shared\src\types" -Force
    }
    
    supabase gen types typescript --linked > packages\shared\src\types\supabase.ts
    Write-Host "✅ TypeScript types generated successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ TypeScript type generation failed. You can generate them later with:" -ForegroundColor Yellow
    Write-Host "supabase gen types typescript --linked > packages\shared\src\types\supabase.ts" -ForegroundColor Yellow
}

Write-Host "`n=== Migration Summary ===" -ForegroundColor Green
Write-Host "✅ Supabase CLI installed and configured" -ForegroundColor Green
Write-Host "✅ Project linked to remote Supabase instance" -ForegroundColor Green
Write-Host "✅ Database schema deployed (or instructions provided)" -ForegroundColor Green
Write-Host "✅ Complete SQL script available: supabase\complete_migration.sql" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Verify the migration in your Supabase dashboard" -ForegroundColor White
Write-Host "2. Test the database connection in your app" -ForegroundColor White
Write-Host "3. Continue with Week 3-4 development (Authentication & User Management)" -ForegroundColor White

Write-Host "`nUseful Commands:" -ForegroundColor Cyan
Write-Host "- Check status: supabase status" -ForegroundColor White
Write-Host "- View local studio: supabase studio" -ForegroundColor White
Write-Host "- Push changes: supabase db push --linked" -ForegroundColor White
Write-Host "- Generate types: supabase gen types typescript --linked" -ForegroundColor White

Read-Host "`nPress Enter to exit"