# RiceMillOS Supabase Local & Remote Setup Script
# This script sets up both local and remote Supabase environments

Write-Host "=== RiceMillOS Supabase Setup ===" -ForegroundColor Green
Write-Host "Setting up local and remote Supabase environments..." -ForegroundColor Yellow

# Navigate to project directory
Set-Location "c:\Users\HI\Documents\deve local\QoderERPCoop"

# Function to check if command exists
function Test-Command($cmdname) {
    try {
        Get-Command $cmdname -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Function to refresh environment variables
function Refresh-Environment {
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
}

Write-Host "`n1. Checking prerequisites..." -ForegroundColor Cyan

# Check Docker Desktop (for local Supabase)
Write-Host "Checking Docker Desktop..." -ForegroundColor White
if (Test-Command "docker") {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Docker Desktop not found." -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    Write-Host "Docker is required for local Supabase development." -ForegroundColor Yellow
    $continue = Read-Host "Continue without Docker? (y/n)"
    if ($continue -ne 'y' -and $continue -ne 'Y') {
        exit
    }
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor White
Refresh-Environment
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️ Node.js not found in PATH. Checking installation..." -ForegroundColor Yellow
    
    # Check if Node.js is installed but not in PATH
    if (Test-Path "C:\Program Files\nodejs\node.exe") {
        Write-Host "Node.js found but not in PATH. Adding to current session..." -ForegroundColor Yellow
        $env:PATH += ";C:\Program Files\nodejs"
        $nodeVersion = & "C:\Program Files\nodejs\node.exe" --version
        Write-Host "✅ Node.js available: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js not installed. Please install Node.js from https://nodejs.org" -ForegroundColor Red
        exit
    }
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor White
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} else {
    if (Test-Path "C:\Program Files\nodejs\npm.cmd") {
        $env:PATH += ";C:\Program Files\nodejs"
        $npmVersion = & "C:\Program Files\nodejs\npm.cmd" --version
        Write-Host "✅ npm available: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ npm not found" -ForegroundColor Red
        exit
    }
}

Write-Host "`n2. Installing Supabase CLI..." -ForegroundColor Cyan
if (Test-Command "supabase") {
    $supabaseVersion = supabase --version
    Write-Host "✅ Supabase CLI already installed: $supabaseVersion" -ForegroundColor Green
} else {
    Write-Host "Installing Supabase CLI via npm..." -ForegroundColor White
    try {
        if (Test-Command "npm") {
            npm install -g supabase
        } else {
            & "C:\Program Files\nodejs\npm.cmd" install -g supabase
        }
        
        # Refresh environment and check again
        Refresh-Environment
        if (Test-Command "supabase") {
            $supabaseVersion = supabase --version
            Write-Host "✅ Supabase CLI installed: $supabaseVersion" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Installation completed but CLI not found in PATH" -ForegroundColor Yellow
            Write-Host "You may need to restart your terminal" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Failed to install Supabase CLI via npm" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        exit
    }
}

Write-Host "`n3. Initializing Supabase project..." -ForegroundColor Cyan
if (Test-Path "supabase\config.toml") {
    Write-Host "✅ Supabase project already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Supabase project..." -ForegroundColor White
    try {
        supabase init
        Write-Host "✅ Supabase project initialized" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to initialize Supabase project" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        exit
    }
}

Write-Host "`n4. Setting up local Supabase environment..." -ForegroundColor Cyan
if (Test-Command "docker") {
    Write-Host "Starting local Supabase stack..." -ForegroundColor White
    try {
        # Check if local Supabase is already running
        $status = supabase status 2>$null
        if ($status -match "supabase local development setup is running") {
            Write-Host "✅ Local Supabase already running" -ForegroundColor Green
        } else {
            Write-Host "Starting local Supabase (this may take a few minutes)..." -ForegroundColor Yellow
            supabase start
            Write-Host "✅ Local Supabase started successfully" -ForegroundColor Green
        }
        
        # Display local URLs
        Write-Host "`nLocal Supabase URLs:" -ForegroundColor Cyan
        supabase status
        
    } catch {
        Write-Host "⚠️ Failed to start local Supabase" -ForegroundColor Yellow
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "You can start it manually later with: supabase start" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Docker not available, skipping local Supabase setup" -ForegroundColor Yellow
}

Write-Host "`n5. Linking to remote Supabase project..." -ForegroundColor Cyan
try {
    # Check if already linked
    $linkStatus = supabase projects list 2>$null
    if ($linkStatus -match "rwwubiimzkxmeqpwtsjn") {
        Write-Host "✅ Already linked to remote project" -ForegroundColor Green
    } else {
        Write-Host "Linking to remote project: rwwubiimzkxmeqpwtsjn" -ForegroundColor White
        supabase link --project-ref rwwubiimzkxmeqpwtsjn
        Write-Host "✅ Successfully linked to remote project" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Failed to link to remote project automatically" -ForegroundColor Yellow
    Write-Host "Please run manually: supabase link --project-ref rwwubiimzkxmeqpwtsjn" -ForegroundColor Yellow
    Write-Host "You may need to login first: supabase login" -ForegroundColor Yellow
}

Write-Host "`n6. Deploying database schema to remote..." -ForegroundColor Cyan
$deployChoice = Read-Host "Deploy migrations to remote database? (y/n)"
if ($deployChoice -eq 'y' -or $deployChoice -eq 'Y') {
    try {
        Write-Host "Deploying migrations to remote database..." -ForegroundColor White
        supabase db push --linked
        Write-Host "✅ Database schema deployed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to deploy migrations automatically" -ForegroundColor Red
        Write-Host "Alternative: Use the complete_migration.sql file" -ForegroundColor Yellow
        Write-Host "1. Open Supabase Dashboard: https://supabase.com/dashboard" -ForegroundColor Yellow
        Write-Host "2. Go to SQL Editor" -ForegroundColor Yellow  
        Write-Host "3. Execute: supabase\complete_migration.sql" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Skipping remote deployment" -ForegroundColor Yellow
    Write-Host "You can deploy later with: supabase db push --linked" -ForegroundColor Yellow
}

Write-Host "`n7. Generating TypeScript types..." -ForegroundColor Cyan
try {
    # Create directory if it doesn't exist
    if (!(Test-Path "packages\shared\src\types")) {
        New-Item -ItemType Directory -Path "packages\shared\src\types" -Force | Out-Null
    }
    
    # Generate types from remote database
    supabase gen types typescript --linked > packages\shared\src\types\supabase.ts
    Write-Host "✅ TypeScript types generated: packages\shared\src\types\supabase.ts" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Failed to generate TypeScript types" -ForegroundColor Yellow
    Write-Host "You can generate them later with:" -ForegroundColor Yellow
    Write-Host "supabase gen types typescript --linked > packages\shared\src\types\supabase.ts" -ForegroundColor Yellow
}

Write-Host "`n=== Setup Complete ===" -ForegroundColor Green

Write-Host "`nEnvironment Status:" -ForegroundColor Cyan
Write-Host "✅ Local Development:" -ForegroundColor Green
if (Test-Command "docker") {
    Write-Host "   - Supabase Local: Available (supabase start)" -ForegroundColor White
    Write-Host "   - Local Studio: http://localhost:54323" -ForegroundColor White
    Write-Host "   - Local API: http://localhost:54321" -ForegroundColor White
} else {
    Write-Host "   - Supabase Local: Not available (Docker required)" -ForegroundColor Yellow
}

Write-Host "✅ Remote Production:" -ForegroundColor Green
Write-Host "   - Project URL: https://rwwubiimzkxmeqpwtsjn.supabase.co" -ForegroundColor White
Write-Host "   - Dashboard: https://supabase.com/dashboard/project/rwwubiimzkxmeqpwtsjn" -ForegroundColor White

Write-Host "`nAvailable Commands:" -ForegroundColor Cyan
Write-Host "npm run supabase:start       # Start local Supabase" -ForegroundColor White
Write-Host "npm run supabase:stop        # Stop local Supabase" -ForegroundColor White
Write-Host "npm run supabase:studio      # Open local Studio" -ForegroundColor White
Write-Host "npm run supabase:status      # Check status" -ForegroundColor White
Write-Host "npm run supabase:deploy      # Deploy to remote" -ForegroundColor White
Write-Host "npm run supabase:generate    # Generate TypeScript types" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Verify tables in Supabase Dashboard" -ForegroundColor White
Write-Host "2. Test database connection in your app" -ForegroundColor White
Write-Host "3. Start development with: npm run dev" -ForegroundColor White
Write-Host "4. Continue with Week 3-4: Authentication & User Management" -ForegroundColor White

Write-Host "`nEnvironment Files:" -ForegroundColor Cyan
Write-Host "- .env.local (contains your Supabase credentials)" -ForegroundColor White
Write-Host "- supabase/config.toml (Supabase project configuration)" -ForegroundColor White
Write-Host "- supabase/migrations/ (database migration files)" -ForegroundColor White

Read-Host "`nPress Enter to exit"