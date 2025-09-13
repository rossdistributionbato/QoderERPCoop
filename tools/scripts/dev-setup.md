# Development Setup Guide
# RiceMillOS Local Development Environment

## Prerequisites

Before starting development, ensure you have:

1. **Node.js 18+** installed
2. **Git** installed
3. **Supabase CLI** installed: `npm install -g supabase`
4. **Supabase Account** with project created

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ricemillos.git
cd ricemillos

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

## Step 2: Configure Environment

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rwwubiimzkxmeqpwtsjn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3ViaWltemt4bWVxcHd0c2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTY4MzMsImV4cCI6MjA2NTI5MjgzM30.kJCMNLsscsd8g6XUdsvGADLSSLHvE-0M1N9AUNGVi2s
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 3: Database Setup

### Option A: Use Remote Supabase Database
```bash
# Apply database schema to your Supabase project
supabase db push --project-ref rwwubiimzkxmeqpwtsjn
```

### Option B: Local Development (Recommended)
```bash
# Start local Supabase stack
supabase start

# Apply database schema
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > packages/shared/src/types/supabase.ts
```

## Step 4: Start Development

```bash
# Start the development server
npm run dev
```

This will start:
- Frontend at: http://localhost:3000
- Supabase Studio at: http://localhost:54323 (if using local)

## Step 5: Create First User

1. Go to http://localhost:3000
2. Click "Get Started" or "Login"
3. Register a new account
4. The first user will be created in the database

## Project Structure

```
ricemillos/
├── apps/
│   └── web/                 # Next.js frontend
├── packages/
│   ├── shared/              # Shared types and utilities
│   ├── ui/                  # Shared UI components
│   └── database/            # Database schema and migrations
├── tools/
│   └── scripts/             # Development scripts
└── docs/                    # Documentation
```

## Available Scripts

```bash
# Development
npm run dev                  # Start development server
npm run build               # Build for production
npm run start               # Start production server

# Database
npm run supabase:start      # Start local Supabase
npm run supabase:stop       # Stop local Supabase
npm run supabase:reset      # Reset database
npm run supabase:generate   # Generate TypeScript types

# Testing
npm run test                # Run tests
npm run test:coverage       # Run tests with coverage
npm run lint                # Run linting
npm run type-check          # Type checking
```

## Common Issues & Solutions

### 1. npm not found
Install Node.js from https://nodejs.org/

### 2. Supabase CLI not found
```bash
npm install -g supabase
```

### 3. Permission errors on Windows
Run PowerShell as Administrator

### 4. Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### 5. Database connection issues
- Check your Supabase credentials in `.env.local`
- Ensure your Supabase project is active
- Check network connectivity

## Next Steps

Once development environment is running:

1. **Explore the codebase** - Start with `apps/web/src/app/page.tsx`
2. **Check the database** - Visit Supabase Studio to see tables
3. **Start coding** - Begin with Week 3-4 tasks in TODO.md
4. **Run tests** - Ensure everything works before making changes

## Support

If you encounter issues:
1. Check this guide first
2. Review the TODO.md file
3. Check Supabase documentation
4. Create an issue in the repository

Happy coding! 🚀