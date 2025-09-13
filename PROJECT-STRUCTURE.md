# Project Structure Overview

This document outlines the complete project structure for RiceMillOS, explaining the purpose and organization of each directory and file.

## Root Directory Structure

```
ricemillos/
├── apps/                           # Application packages
│   ├── api/                        # NestJS Backend API
│   ├── web/                        # Next.js Web Application
│   └── mobile/                     # PWA Mobile App (optional)
├── packages/                       # Shared packages
│   ├── database/                   # Prisma schema and migrations
│   ├── shared/                     # Shared types and utilities
│   └── ui/                         # Shared UI components
├── tools/                          # Development and deployment tools
│   ├── scripts/                    # Build and deployment scripts
│   └── docker/                     # Docker configurations
├── docs/                           # Documentation
├── .github/                        # GitHub workflows and templates
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── docker-compose.dev.yml          # Development Docker setup
├── docker-compose.prod.yml         # Production Docker setup
├── package.json                    # Root package.json (workspace)
├── turbo.json                      # Turborepo configuration
├── README.md                       # Project overview
├── LICENSE                         # License file
└── PROJECT-STRUCTURE.md            # This file
```

## Apps Directory

### `/apps/api` - Backend API (NestJS)
```
apps/api/
├── src/
│   ├── auth/                       # Authentication module
│   ├── users/                      # User management
│   ├── farmers/                    # Farmer management
│   ├── procurement/                # Paddy intake
│   ├── production/                 # Milling operations
│   ├── inventory/                  # Inventory management
│   ├── sales/                      # Sales and orders
│   ├── financial/                  # Financial transactions
│   ├── analytics/                  # Reports and analytics
│   ├── common/                     # Shared utilities
│   ├── config/                     # Configuration
│   └── main.ts                     # Application entry point
├── test/                           # Test files
├── prisma/                         # Database schema (symlink)
├── Dockerfile                      # Production Docker image
├── Dockerfile.dev                  # Development Docker image
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

### `/apps/web` - Frontend Web App (Next.js)
```
apps/web/
├── src/
│   ├── app/                        # Next.js 14 app directory
│   │   ├── (auth)/                 # Authentication pages
│   │   ├── dashboard/              # Dashboard pages
│   │   ├── farmers/                # Farmer management
│   │   ├── procurement/            # Procurement pages
│   │   ├── production/             # Production pages
│   │   ├── inventory/              # Inventory pages
│   │   ├── sales/                  # Sales pages
│   │   ├── financial/              # Financial pages
│   │   ├── reports/                # Reports pages
│   │   ├── settings/               # Settings pages
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   ├── components/                 # React components
│   │   ├── ui/                     # Basic UI components
│   │   ├── forms/                  # Form components
│   │   ├── charts/                 # Chart components
│   │   └── layout/                 # Layout components
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility libraries
│   ├── stores/                     # State management (Zustand)
│   ├── types/                      # TypeScript type definitions
│   └── utils/                      # Utility functions
├── public/                         # Static assets
│   ├── icons/                      # App icons
│   ├── images/                     # Images
│   └── manifest.json               # PWA manifest
├── package.json                    # Dependencies
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Packages Directory

### `/packages/database` - Database Schema & Migrations
```
packages/database/
├── prisma/
│   ├── schema.prisma               # Prisma schema definition
│   ├── migrations/                 # Database migrations
│   └── seed.ts                     # Database seeding
├── src/
│   ├── client.ts                   # Prisma client setup
│   └── types.ts                    # Generated types
└── package.json                    # Package configuration
```

### `/packages/shared` - Shared Types & Utilities
```
packages/shared/
├── src/
│   ├── types/                      # Shared TypeScript types
│   │   ├── api.ts                  # API response types
│   │   ├── entities.ts             # Entity types
│   │   └── enums.ts                # Enum definitions
│   ├── utils/                      # Shared utility functions
│   │   ├── validation.ts           # Validation schemas
│   │   ├── formatting.ts           # Data formatting
│   │   └── constants.ts            # Application constants
│   ├── schemas/                    # Zod validation schemas
│   └── index.ts                    # Package exports
└── package.json                    # Package configuration
```

### `/packages/ui` - Shared UI Components
```
packages/ui/
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── button/                 # Button component
│   │   ├── input/                  # Input components
│   │   ├── modal/                  # Modal component
│   │   ├── table/                  # Table component
│   │   └── form/                   # Form components
│   ├── hooks/                      # Custom hooks
│   ├── utils/                      # UI utilities
│   └── index.ts                    # Component exports
├── tailwind.config.js              # Tailwind configuration
└── package.json                    # Package configuration
```

## Tools Directory

### `/tools/scripts` - Build & Deployment Scripts
```
tools/scripts/
├── build.sh                       # Build script
├── deploy-staging.sh               # Staging deployment
├── deploy-production.sh            # Production deployment
├── db-backup.sh                    # Database backup
├── db-restore.sh                   # Database restore
└── setup-dev.sh                    # Development setup
```

### `/tools/docker` - Docker Configurations
```
tools/docker/
├── api/
│   ├── Dockerfile                  # API production Docker
│   └── Dockerfile.dev              # API development Docker
├── web/
│   ├── Dockerfile                  # Web production Docker
│   └── Dockerfile.dev              # Web development Docker
├── nginx/
│   └── nginx.conf                  # Nginx configuration
└── postgres/
    └── init.sql                    # Database initialization
```

## Documentation Directory

```
docs/
├── api/                            # API documentation
│   ├── authentication.md          # Auth documentation
│   ├── endpoints.md                # Endpoint documentation
│   └── schemas.md                  # Schema documentation
├── user-guide/                     # User documentation
│   ├── getting-started.md          # Getting started guide
│   ├── farmer-management.md        # Farmer module guide
│   ├── procurement.md              # Procurement guide
│   └── reports.md                  # Reports guide
├── development/                    # Development documentation
│   ├── setup.md                    # Development setup
│   ├── coding-standards.md         # Coding standards
│   └── testing.md                  # Testing guidelines
└── deployment/                     # Deployment documentation
    ├── aws-setup.md                # AWS setup guide
    └── monitoring.md               # Monitoring setup
```

## GitHub Directory

```
.github/
├── workflows/                      # GitHub Actions
│   ├── ci.yml                      # Continuous Integration
│   ├── cd-staging.yml              # Staging deployment
│   ├── cd-production.yml           # Production deployment
│   └── security.yml                # Security checks
├── ISSUE_TEMPLATE/                 # Issue templates
├── PULL_REQUEST_TEMPLATE.md        # PR template
└── CODEOWNERS                      # Code ownership
```

## Configuration Files

### Root Configuration Files
- **package.json**: Workspace configuration and scripts
- **turbo.json**: Turborepo build pipeline configuration
- **.env.example**: Environment variables template
- **.gitignore**: Git ignore patterns
- **tsconfig.json**: Root TypeScript configuration
- **prettier.config.js**: Code formatting configuration
- **eslint.config.js**: Linting configuration

### Development Files
- **docker-compose.dev.yml**: Development environment setup
- **docker-compose.prod.yml**: Production environment setup
- **Makefile**: Development shortcuts (optional)

## Module Organization

### Backend Modules (NestJS)
Each module follows this structure:
```
src/[module]/
├── dto/                            # Data Transfer Objects
├── entities/                       # Database entities
├── guards/                         # Route guards
├── interfaces/                     # TypeScript interfaces
├── services/                       # Business logic
├── controllers/                    # HTTP controllers
├── [module].module.ts              # Module definition
└── tests/                          # Module tests
```

### Frontend Pages (Next.js)
Each page group follows this structure:
```
src/app/[feature]/
├── components/                     # Feature-specific components
├── hooks/                          # Feature-specific hooks
├── types/                          # Feature-specific types
├── utils/                          # Feature-specific utilities
├── page.tsx                        # Main page component
├── layout.tsx                      # Feature layout
└── loading.tsx                     # Loading component
```

## Key Design Principles

### Monorepo Benefits
- **Shared Code**: Common types and utilities across applications
- **Consistent Tooling**: Same linting, formatting, and build tools
- **Simplified Dependencies**: Centralized dependency management
- **Easy Refactoring**: Cross-package refactoring support

### Module Boundaries
- **Clear Separation**: Each module has well-defined responsibilities
- **Minimal Coupling**: Modules communicate through defined interfaces
- **Testability**: Each module can be tested independently
- **Reusability**: Components and utilities are designed for reuse

### Development Workflow
1. **Feature Development**: Work in feature branches
2. **Code Review**: All changes go through pull requests
3. **Testing**: Automated testing at multiple levels
4. **Deployment**: Automated CI/CD pipeline
5. **Monitoring**: Production monitoring and alerting

This structure supports scalable development, easy maintenance, and clear separation of concerns while enabling efficient collaboration across the development team.