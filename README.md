# RiceMillOS - Digital Rice Mill Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A comprehensive digital platform designed to transform traditional rice mill operations into efficient, transparent, and data-driven businesses.

## 🎯 Project Overview

RiceMillOS addresses the critical pain points of manual record-keeping, inventory mismanagement, and financial opacity in rice mill operations through a modern, mobile-first digital solution.

### Key Features
- **Farmer Management**: Registration, credit tracking, transaction history
- **Procurement**: Paddy intake with quality parameters and receipts
- **Production**: Batch processing and yield tracking
- **Inventory**: Real-time stock management with alerts
- **Sales**: Order management and customer relations
- **Financial**: Automated ledgers, payments, and reporting
- **Analytics**: Business intelligence and performance insights

## 🏗 Architecture

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, PWA
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Database**: PostgreSQL with Row Level Security
- **Infrastructure**: Vercel (Frontend) + Supabase (Backend)
- **DevOps**: GitHub Actions, Supabase CLI

### System Architecture
```
Frontend (Next.js PWA) → Supabase Backend → PostgreSQL Database
                                      ↓
                              Real-time Engine
```

## 📁 Project Structure

```
ricemillos/
├── apps/
│   ├── api/                    # NestJS Backend API
│   ├── web/                    # Next.js Web Application  
│   └── mobile/                 # PWA Mobile App
├── packages/
│   ├── database/               # Prisma schema and migrations
│   ├── shared/                 # Shared types and utilities
│   └── ui/                     # Shared UI components
├── tools/
│   ├── scripts/                # Build and deployment scripts
│   └── docker/                 # Docker configurations
├── docs/                       # Documentation
└── .github/workflows/          # CI/CD workflows
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/rossdistributionbato/QoderERPCoop.git
cd QoderERPCoop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Set up database (see DATABASE-SETUP.md for details)
# Go to your Supabase dashboard and run the SQL schema

# Start development server
npm run dev
```

Visit http://localhost:3000 to see your rice mill management system!

## 📚 Documentation

- **[Product Requirements Document](./PRD-RiceMillOS.md)** - Complete feature specifications
- **[System Architecture](./Architecture-Design.md)** - Technical architecture and database design
- **[Implementation Plan](./Implementation-Plan.md)** - Detailed development roadmap
- **[Database Setup Guide](./DATABASE-SETUP.md)** - Step-by-step database configuration
- **[Project Structure](./PROJECT-STRUCTURE.md)** - Codebase organization guide
- **[Development TODO](./TODO.md)** - 200+ tasks across 22-28 weeks

## 🏗️ Current Status

✅ **Phase 1: Foundation Complete**
- Project structure and configuration
- Database schema with Row Level Security
- Supabase integration
- Next.js 14 frontend with PWA support
- Authentication system
- Comprehensive documentation

🚧 **Phase 2: Development In Progress**
- User interface implementation
- Farmer management module
- Procurement system
- Inventory management

## 🔗 Live Demo

- **Frontend**: Coming soon
- **Documentation**: Available in this repository
- **Database Schema**: Ready for deployment

## 📋 Development Roadmap

### MVP Phase (8-10 weeks)
- ✅ Authentication & user management
- ✅ Farmer registration and management
- ✅ Paddy intake processing
- ✅ Basic inventory tracking
- ✅ Sales order processing
- ✅ Mobile-responsive interface

### Phase 2 (6-8 weeks)
- 🔄 Production & milling operations
- 🔄 Advanced inventory management
- 🔄 Financial management
- 🔄 Analytics & reporting

### Phase 3 (8-10 weeks)
- ⏳ AI/ML features
- ⏳ Advanced integrations
- ⏳ Multi-mill support
- ⏳ Mobile app enhancements

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🚢 Deployment

### Staging
```bash
# Deploy to staging
npm run deploy:staging
```

### Production
```bash
# Deploy to production
npm run deploy:production
```

## 📖 Documentation

- [Product Requirements Document](./PRD-RiceMillOS.md)
- [System Architecture](./Architecture-Design.md)
- [Implementation Plan](./Implementation-Plan.md)
- [API Documentation](./docs/api.md)
- [User Guide](./docs/user-guide.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Write tests for new features
- Use conventional commits
- Maintain >80% test coverage
- Follow the monorepo structure with Turborepo

## 📊 Project Metrics

- **Lines of Code**: 6,000+
- **Documentation Pages**: 10+
- **Database Tables**: 25+
- **Development Tasks**: 200+
- **Implementation Timeline**: 22-28 weeks
- **Expected ROI**: 15% profit improvement

## 🌐 Deployment

### Production Deployment
- **Frontend**: Vercel (recommended)
- **Backend**: Supabase
- **Database**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **CDN**: Vercel Edge Network

### Environment Setup
1. Create Supabase project
2. Deploy database schema
3. Configure environment variables
4. Deploy to Vercel
5. Set up custom domain (optional)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Manager**: Planning & coordination
- **Tech Lead**: Architecture & code review
- **Backend Developers**: API development
- **Frontend Developers**: UI/UX implementation
- **DevOps Engineer**: Infrastructure & deployment
- **QA Engineer**: Testing & quality assurance

## 📞 Support

For support and questions:
- Email: support@ricemillos.com
- Documentation: https://docs.ricemillos.com
- Issues: GitHub Issues

---

**RiceMillOS** - Empowering rice mills with modern technology 🌾