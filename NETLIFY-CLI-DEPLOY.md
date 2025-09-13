# 🚀 Netlify CLI Deployment Guide

## Quick Deploy Steps

### 1. Install Dependencies (if not done)
```bash
npm install -g netlify-cli
```

### 2. Login to Netlify
```bash
netlify login
```

### 3. Initialize Netlify Project
```bash
netlify init
```
- Select "Create & configure a new project"
- Choose your team
- Enter site name: `ricemillos-app`

### 4. Set Build Configuration
The CLI will ask for:
- Build command: `npm install && cd apps/web && npm run build`
- Directory to deploy: `apps/web/out`

### 5. Deploy
```bash
# Deploy to draft URL first
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Alternative: Manual Deployment

If CLI has issues, use the web interface:

1. **Push to GitHub** (already done)
2. **Go to [app.netlify.com](https://app.netlify.com)**
3. **New site from Git** → GitHub → Select repository
4. **Build settings**:
   - Build command: `npm install && cd apps/web && npm run build`
   - Publish directory: `apps/web/out`
   - Node version: 18

5. **Environment Variables**:
```
NEXT_PUBLIC_SUPABASE_URL=https://rwwubiimzkxmeqpwtsjn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3ViaWltemt4bWVxcHd0c2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTY4MzMsImV4cCI6MjA2NTI5MjgzM30.kJCMNLsscsd8g6XUdsvGADLSSLHvE-0M1N9AUNGVi2s
NODE_ENV=production
```

## Deployment Status
- ✅ Netlify CLI installed and authenticated
- ✅ Repository ready with deployment configuration
- ✅ Environment variables configured
- 🔄 Ready for deployment via web interface

**Recommendation**: Use the web interface method for most reliable deployment.