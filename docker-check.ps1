#!/usr/bin/env pwsh
# Docker Environment Check Script for RiceMillOS

Write-Host "=== RiceMillOS Docker Environment Check ===" -ForegroundColor Green

$errors = @()
$warnings = @()

# Check Docker Desktop
Write-Host "`n1. Checking Docker Desktop..." -ForegroundColor Cyan
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
    
    # Check if Docker is running
    $dockerInfo = docker info 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker daemon is running" -ForegroundColor Green
    } else {
        $errors += "❌ Docker daemon is not running. Please start Docker Desktop."
    }
} catch {
    $errors += "❌ Docker Desktop not found. Please install Docker Desktop."
}

# Check Docker Compose
Write-Host "`n2. Checking Docker Compose..." -ForegroundColor Cyan
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose found: $composeVersion" -ForegroundColor Green
} catch {
    $warnings += "⚠️ Docker Compose not found. Using 'docker compose' syntax."
}

# Check Supabase Local
Write-Host "`n3. Checking Supabase Local Environment..." -ForegroundColor Cyan
try {
    $supabaseStatus = .\supabase.exe status 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Supabase local is running" -ForegroundColor Green
    } else {
        $warnings += "⚠️ Supabase local is not running. Start with: npm run supabase:start"
    }
} catch {
    $warnings += "⚠️ Supabase CLI not found. Docker will work but integration may be limited."
}

# Check Required Files
Write-Host "`n4. Checking Docker Configuration Files..." -ForegroundColor Cyan
$requiredFiles = @(
    "docker-compose.dev.yml",
    "Dockerfile.dev",
    "apps/web/Dockerfile.dev",
    ".env.docker",
    ".dockerignore"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        $errors += "❌ Missing: $file"
    }
}

# Check Port Availability
Write-Host "`n5. Checking Port Availability..." -ForegroundColor Cyan
$ports = @(3000, 6379, 5050, 80)

foreach ($port in $ports) {
    $connection = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    if (!$connection) {
        Write-Host "✅ Port $port is available" -ForegroundColor Green
    } else {
        $warnings += "⚠️ Port $port is in use. Docker may have conflicts."
    }
}

# Check Network Configuration
Write-Host "`n6. Checking Network Requirements..." -ForegroundColor Cyan
try {
    $networks = docker network ls --format "{{.Name}}" 2>$null
    if ($networks -contains "ricemillos-network") {
        Write-Host "✅ Docker network exists" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Network will be created on first run" -ForegroundColor Blue
    }
} catch {
    $warnings += "⚠️ Cannot check Docker networks"
}

# Summary
Write-Host "`n=== Summary ===" -ForegroundColor Green

if ($errors.Count -eq 0) {
    Write-Host "🎉 Environment is ready for Docker development!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. npm run docker:dev        # Start development environment" -ForegroundColor White
    Write-Host "2. http://localhost:3000     # Access your application" -ForegroundColor White
    Write-Host "3. npm run docker:dev:logs   # View container logs" -ForegroundColor White
} else {
    Write-Host "❌ Issues found that need to be resolved:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "`n⚠️ Warnings (non-blocking):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  $warning" -ForegroundColor Yellow
    }
}

Write-Host "`n=== Available Commands ===" -ForegroundColor Cyan
Write-Host "npm run docker:dev           # Start all services" -ForegroundColor White
Write-Host "npm run docker:dev:build     # Build and start" -ForegroundColor White
Write-Host "npm run docker:dev:logs      # View logs" -ForegroundColor White
Write-Host "npm run docker:dev:stop      # Stop services" -ForegroundColor White
Write-Host "npm run docker:dev:clean     # Clean up" -ForegroundColor White
Write-Host "npm run docker:dev:shell     # Access container shell" -ForegroundColor White

if ($errors.Count -eq 0) {
    exit 0
} else {
    exit 1
}