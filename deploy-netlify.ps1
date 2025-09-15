# PowerShell script for Netlify deployment
# This script handles the full deployment process with error handling

Write-Host "🚀 Starting Netlify CLI Deployment..." -ForegroundColor Green

# Step 1: Install dependencies without scripts
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --ignore-scripts
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 2: Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npx turbo run build --filter=web
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Step 3: Deploy to Netlify
Write-Host "🌐 Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod --dir=apps\web\out
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌍 Your site is live at: https://ricezap.netlify.app" -ForegroundColor Cyan