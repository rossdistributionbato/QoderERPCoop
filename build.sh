#!/bin/bash
# Build script for Netlify deployment

echo "🚀 Starting RiceMillOS build for Netlify..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the web application
echo "🔨 Building web application..."
cd apps/web
npm run build

echo "✅ Build completed successfully!"

# List output directory for debugging
echo "📁 Output directory contents:"
ls -la out/