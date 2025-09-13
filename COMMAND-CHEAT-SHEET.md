# 🚀 RiceMillOS Command Cheat Sheet

## 📋 Quick Reference for All Project Commands

### 🏗️ Project Setup & Development

#### **Start Development (Local)**
```powershell
# Start local development (native)
npm run dev

# Start Supabase local stack
npm run supabase:start

# Check Supabase status
npm run supabase:status

# Open Supabase Studio
# Navigate to: http://127.0.0.1:54323
```

#### **Start Development (Docker)**
```powershell
# Start isolated Docker environment
npm run docker:dev

# Build and start Docker (rebuild containers)
npm run docker:dev:build

# View Docker logs
npm run docker:dev:logs

# Stop Docker services
npm run docker:dev:stop

# Clean Docker environment
npm run docker:dev:clean

# Access container shell
npm run docker:dev:shell
```

## 🗄️ Supabase CLI Commands

### **Local Development**
```powershell
# Start local Supabase
.\supabase.exe start
# OR
npm run supabase:start

# Stop local Supabase
.\supabase.exe stop
# OR
npm run supabase:stop

# Check status
.\supabase.exe status
# OR
npm run supabase:status

# Reset database (reapply all migrations)
.\supabase.exe db reset
# OR
npm run supabase:reset
```

### **Database Migrations**
```powershell
# Create new migration
.\supabase.exe migration new "description_here"
# OR
npm run supabase:migrate:new "description_here"

# Apply migrations to local
.\supabase.exe db reset

# Deploy to remote (after linking)
.\supabase.exe db push --linked
# OR
npm run supabase:deploy
```

### **Remote Management**
```powershell
# Login to Supabase (requires browser)
.\supabase.exe login

# Link to remote project
.\supabase.exe link --project-ref rwwubiimzkxmeqpwtsjn
# OR
npm run supabase:link

# Deploy migrations to remote
.\supabase.exe db push --linked
# OR
npm run supabase:deploy
```

### **TypeScript Types**
```powershell
# Generate types from local database
.\supabase.exe gen types typescript --local > packages/shared/src/types/supabase.ts
# OR
npm run supabase:generate

# Generate types from remote database
.\supabase.exe gen types typescript --linked > packages/shared/src/types/supabase.ts
```

## 🌐 Netlify Deployment

### **Netlify CLI Installation**
```powershell
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Check login status
netlify status
```

### **Initial Deployment Setup**
```powershell
# Initialize Netlify in your project
netlify init

# Or link to existing Netlify site
netlify link

# Set build command and publish directory
# Build command: npm run build
# Publish directory: apps/web/out (or .next for Next.js)
```

### **Deployment Commands**
```powershell
# Deploy to preview (staging)
netlify deploy

# Build and deploy to preview
netlify deploy --build

# Deploy to production
netlify deploy --prod

# Build and deploy to production
netlify deploy --prod --build

# Deploy specific directory
netlify deploy --dir=apps/web/out --prod
```

### **Environment Variables (Netlify)**
```powershell
# Set environment variable
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://rwwubiimzkxmeqpwtsjn.supabase.co"

# List environment variables
netlify env:list

# Import from .env file
netlify env:import .env.production

# Remove environment variable
netlify env:unset VARIABLE_NAME
```

### **Site Management**
```powershell
# View site info
netlify sites:list

# Open site in browser
netlify open

# View deployment logs
netlify logs

# Watch for changes and auto-deploy
netlify dev
```

## 🔧 Build & Testing Commands

### **Build Commands**
```powershell
# Build all apps (Turborepo)
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### **Testing Commands**
```powershell
# Run all tests
npm run test

# Unit tests
npm run test:unit

# Integration tests  
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📦 NPX Useful Commands

### **Next.js**
```powershell
# Create new Next.js app
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Analyze bundle
npx @next/bundle-analyzer

# Check Next.js version
npx next --version
```

### **Database & Tools**
```powershell
# Run Prisma Studio (if using Prisma)
npx prisma studio

# Database migration (Prisma)
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Format SQL files
npx sql-formatter-cli format
```

### **Development Tools**
```powershell
# TypeScript compiler
npx tsc --noEmit

# ESLint specific files
npx eslint src/ --fix

# Prettier specific files
npx prettier --write "src/**/*.{ts,tsx}"

# Check for outdated packages
npx npm-check-updates

# Update packages
npx npm-check-updates -u
```

## 🐳 Docker Advanced Commands

### **Container Management**
```powershell
# View running containers
docker ps

# View all containers
docker ps -a

# Container logs
docker logs ricemillos-web

# Execute command in container
docker exec -it ricemillos-web sh

# Container stats
docker stats

# Remove stopped containers
docker container prune
```

### **Image Management**
```powershell
# View images
docker images

# Remove unused images
docker image prune

# Build specific service
docker-compose -f docker-compose.dev.yml build web

# Pull latest images
docker-compose -f docker-compose.dev.yml pull
```

### **Network & Volume**
```powershell
# View networks
docker network ls

# View volumes
docker volume ls

# Remove unused volumes
docker volume prune

# Clean everything
docker system prune -a --volumes
```

## 🚀 Production Deployment Workflow

### **1. Pre-deployment Checklist**
```powershell
# 1. Build and test locally
npm run build
npm run test
npm run type-check

# 2. Deploy database changes
npm run supabase:deploy

# 3. Generate production types
.\supabase.exe gen types typescript --linked > packages/shared/src/types/supabase.ts
```

### **2. Netlify Deployment**
```powershell
# Environment setup (one-time)
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://rwwubiimzkxmeqpwtsjn.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key"
netlify env:set NEXT_PUBLIC_APP_NAME "RiceMillOS"

# Deploy to production
netlify deploy --prod --build
```

### **3. Verify Deployment**
```powershell
# Check site status
netlify status

# View logs
netlify logs

# Open deployed site
netlify open
```

## 🔧 Project Maintenance

### **Dependencies**
```powershell
# Install dependencies
npm install

# Update dependencies
npm update

# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### **Git Workflow**
```powershell
# Status and staging
git status
git add .
git commit -m "feat: description"

# Push changes
git push origin main

# Create feature branch
git checkout -b feature/new-feature
git push -u origin feature/new-feature
```

## 🚨 Troubleshooting Commands

### **Reset Everything**
```powershell
# Reset Supabase local
npm run supabase:stop
npm run supabase:start

# Reset Docker
npm run docker:dev:clean
npm run docker:dev:build

# Reset Node modules
rm -rf node_modules
npm install

# Reset build cache
rm -rf .next
npm run build
```

### **Debug Commands**
```powershell
# Check ports in use
netstat -an | findstr :3000

# Check Docker processes
docker ps -a

# Check Supabase processes
.\supabase.exe status

# View detailed logs
npm run docker:dev:logs
```

## 📱 Quick Access URLs

### **Development**
- **Local App**: http://localhost:3000
- **Supabase Studio**: http://127.0.0.1:54323
- **Docker App**: http://localhost:3000
- **PgAdmin**: http://localhost:5050

### **Production**
- **Supabase Dashboard**: https://supabase.com/dashboard/project/rwwubiimzkxmeqpwtsjn
- **Netlify Dashboard**: https://app.netlify.com

## 🎯 Environment-Specific Commands

### **Local Development**
```powershell
# Native development
npm run dev                    # Start Next.js
npm run supabase:start        # Start Supabase local

# Docker development  
npm run docker:dev            # Start all containers
npm run docker:dev:logs       # Monitor logs
```

### **Staging/Testing**
```powershell
# Deploy to preview
netlify deploy --build

# Test against staging
NEXT_PUBLIC_SUPABASE_URL=staging_url npm run build
```

### **Production**
```powershell
# Deploy to production
netlify deploy --prod --build

# Verify production
netlify open
netlify logs
```

## 📋 Daily Workflow Commands

### **Start Development Session**
```powershell
# Option 1: Native (faster)
npm run supabase:start
npm run dev

# Option 2: Docker (isolated)
npm run docker:dev
npm run docker:dev:logs
```

### **Database Changes**
```powershell
# 1. Create migration
.\supabase.exe migration new "add_new_feature"

# 2. Edit migration file
# Edit: supabase/migrations/[timestamp]_add_new_feature.sql

# 3. Apply locally
.\supabase.exe db reset

# 4. Generate types
npm run supabase:generate

# 5. Deploy to production
npm run supabase:deploy
```

### **Code Changes & Deployment**
```powershell
# 1. Develop and test
npm run dev
npm run test
npm run lint

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --build
```

---

## 🎯 Most Common Commands (Daily Use)

```powershell
# Start development
npm run dev

# Start with Docker
npm run docker:dev

# Database migration
.\supabase.exe migration new "description"
.\supabase.exe db reset

# Deploy to production
netlify deploy --prod --build

# Check status
npm run supabase:status
netlify status
```

**💡 Pro Tip**: Bookmark this cheat sheet and keep it handy for quick reference!