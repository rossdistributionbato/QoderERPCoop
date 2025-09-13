# Windows Build Script for Netlify
Write-Host "🚀 Starting RiceMillOS build for Netlify..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci

# Navigate to web app and build
Write-Host "🔨 Building web application..." -ForegroundColor Yellow
Set-Location "apps\web"
npm run build

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Show output directory
if (Test-Path "out") {
    Write-Host "📁 Output directory created successfully" -ForegroundColor Green
    Get-ChildItem "out" | Select-Object Name, Length | Format-Table
} else {
    Write-Host "❌ Output directory not found" -ForegroundColor Red
}