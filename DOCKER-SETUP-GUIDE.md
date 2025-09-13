# 🐳 RiceMillOS Docker Development Environment

## 📋 Overview

This Docker setup provides a complete isolated development environment for RiceMillOS that integrates with your existing Supabase backend. The setup includes:

- **Next.js Web Application** with hot reload
- **Redis Cache** for session management
- **Nginx Reverse Proxy** (optional)
- **Development Tools Container**
- **Database Administration UI** (PgAdmin)

## 🚀 Quick Start

### Prerequisites
- ✅ Docker Desktop installed and running
- ✅ Your Supabase local environment (already configured)

### 1. Start Development Environment

```powershell
# Start all services
npm run docker:dev

# Or with rebuild
npm run docker:dev:build
```

### 2. Access Your Application

- **Web Application**: http://localhost:3000
- **Redis Cache**: localhost:6379
- **PgAdmin** (optional): http://localhost:5050
- **Nginx Proxy** (optional): http://localhost:80

### 3. View Logs

```powershell
# View all logs
npm run docker:dev:logs

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f web
```

## 🏗️ Architecture

### Container Structure

```
┌─────────────────────────────────────────────┐
│                RiceMillOS                   │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │
│  │   Web   │  │  Redis  │  │  Dev Tools  │ │
│  │ :3000   │  │  :6379  │  │   Tools     │ │
│  └─────────┘  └─────────┘  └─────────────┘ │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐                  │
│  │  Nginx  │  │ PgAdmin │                  │
│  │  :80    │  │ :5050   │                  │
│  └─────────┘  └─────────┘                  │
└─────────────────────────────────────────────┘
           │
    ┌──────▼──────┐
    │   Supabase  │
    │ (External)  │
    │  :54321-4   │
    └─────────────┘
```

### Environment Integration

- **Database**: Uses your local Supabase instance (localhost:54322)
- **Authentication**: Connects to remote Supabase (rwwubiimzkxmeqpwtsjn.supabase.co)
- **Caching**: Redis container for session management
- **Development**: Hot reload with volume mounts

## 🛠️ Available Commands

### Docker Management
```powershell
# Start development environment
npm run docker:dev

# Build and start (rebuild containers)
npm run docker:dev:build

# View logs (follow mode)
npm run docker:dev:logs

# Stop all services
npm run docker:dev:stop

# Clean up (remove volumes and networks)
npm run docker:dev:clean

# Access web container shell
npm run docker:dev:shell

# Access development tools container
npm run docker:dev:tools
```

### Service-Specific Commands
```powershell
# Start only specific services
docker-compose -f docker-compose.dev.yml up web redis

# Start with profiles
docker-compose -f docker-compose.dev.yml --profile tools up -d

# Scale services
docker-compose -f docker-compose.dev.yml up --scale web=2
```

## 📁 Container Details

### 1. Web Container (`ricemillos-web`)
- **Base Image**: Node.js 18 Alpine
- **Port**: 3000
- **Features**:
  - Hot reload with volume mounts
  - Next.js development server
  - TypeScript support
  - Environment variables injected

### 2. Redis Container (`ricemillos-redis`)
- **Base Image**: Redis 7 Alpine
- **Port**: 6379
- **Features**:
  - Persistent data storage
  - Custom configuration
  - Health checks
  - Memory optimization (256MB limit)

### 3. Development Tools (`ricemillos-dev-tools`)
- **Base Image**: Node.js 18 Alpine
- **Features**:
  - Supabase CLI
  - Database tools (psql, redis-cli)
  - Development utilities
  - Docker access

### 4. Nginx Proxy (`ricemillos-nginx`) - Optional
- **Base Image**: Nginx Alpine
- **Port**: 80
- **Features**:
  - Reverse proxy
  - Static file serving
  - Rate limiting
  - Security headers

### 5. PgAdmin (`ricemillos-pgadmin`) - Optional
- **Base Image**: PgAdmin 4
- **Port**: 5050
- **Credentials**:
  - Email: `admin@ricemillos.com`
  - Password: `admin123`

## 🔧 Configuration Files

### Environment Files
- **`.env.docker`** - Docker-specific environment variables
- **`.env.local`** - Local development (existing)

### Docker Files
- **`Dockerfile.dev`** - Main development image
- **`apps/web/Dockerfile.dev`** - Web application image
- **`docker-compose.dev.yml`** - Development orchestration

### Service Configuration
- **`tools/docker/redis/redis.conf`** - Redis configuration
- **`tools/docker/nginx/nginx.dev.conf`** - Nginx configuration
- **`tools/docker/pgadmin/servers.json`** - PgAdmin server presets

## 🚧 Development Workflow

### 1. Code Changes
- Edit files locally
- Changes are automatically synced to containers
- Next.js hot reload picks up changes
- No container restart needed

### 2. Database Changes
- Use your existing Supabase CLI workflow
- Migrations apply to local Supabase (outside Docker)
- Database remains persistent

### 3. Debugging
```powershell
# Access web container
npm run docker:dev:shell

# Check logs
npm run docker:dev:logs

# Inspect container
docker-compose -f docker-compose.dev.yml exec web ps aux
```

## 🔒 Security Features

### Container Security
- Non-root user execution
- Resource limits (Redis: 256MB)
- Health checks
- Network isolation

### Application Security
- Security headers via Nginx
- Rate limiting
- CORS configuration
- Environment variable isolation

## 🎯 Volume Mounts

### Development Volumes
```yaml
volumes:
  - ./apps/web:/app/apps/web          # Web app source
  - ./packages:/app/packages          # Shared packages
  - /app/node_modules                 # Exclude node_modules
```

### Data Volumes
```yaml
volumes:
  - redis_data:/data                  # Redis persistence
  - pgadmin_data:/var/lib/pgadmin    # PgAdmin settings
```

## 🌐 Network Configuration

### Network: `ricemillos-network`
- **Type**: Bridge
- **Subnet**: 172.20.0.0/16
- **DNS**: Automatic service discovery

### Service Communication
- `web` → `redis` (session storage)
- `nginx` → `web` (reverse proxy)
- All services can communicate by service name

## 📊 Monitoring & Health

### Health Checks
- **Web**: HTTP check on port 3000
- **Redis**: PING command check
- **Auto-restart**: Unhealthy containers restart automatically

### Resource Monitoring
```powershell
# Container stats
docker stats

# Specific service stats
docker-compose -f docker-compose.dev.yml exec web top
```

## 🔄 Integration with Existing Setup

### Supabase Integration
- **Local Database**: localhost:54322 (outside Docker)
- **Remote API**: rwwubiimzkxmeqpwtsjn.supabase.co
- **CLI**: Works alongside Docker containers

### Development Tools
- Your existing Supabase CLI commands work
- TypeScript types generation continues to work
- Database migrations apply normally

## 🧪 Testing in Docker

### Unit Tests
```powershell
# Run tests in container
docker-compose -f docker-compose.dev.yml exec web npm test
```

### Integration Tests
```powershell
# Access tools container for testing
npm run docker:dev:tools

# Inside tools container
psql -h 127.0.0.1 -p 54322 -U postgres
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```powershell
   # Check port usage
   netstat -an | findstr :3000
   
   # Stop conflicting services
   npm run supabase:stop
   ```

2. **Container Won't Start**
   ```powershell
   # Check logs
   docker-compose -f docker-compose.dev.yml logs web
   
   # Rebuild
   npm run docker:dev:build
   ```

3. **Volume Mount Issues**
   ```powershell
   # Clean up
   npm run docker:dev:clean
   
   # Restart
   npm run docker:dev
   ```

4. **Database Connection Issues**
   - Ensure Supabase local is running
   - Check network connectivity
   - Verify environment variables

## 🎉 Benefits

### Isolation
- ✅ Consistent development environment
- ✅ No local Node.js version conflicts
- ✅ Easy onboarding for new developers

### Performance
- ✅ Redis caching
- ✅ Nginx optimization
- ✅ Resource limits prevent system overload

### Development Experience
- ✅ Hot reload preserved
- ✅ All existing tools work
- ✅ Database migrations unchanged
- ✅ TypeScript types generation works

### Production Similarity
- ✅ Similar to production architecture
- ✅ Container-based deployment ready
- ✅ Environment variable management

---

**🎯 Your isolated Docker development environment is ready! The setup preserves all your existing Supabase workflows while providing container isolation and consistency.**