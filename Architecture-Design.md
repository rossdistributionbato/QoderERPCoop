# System Architecture & Database Design
# RiceMillOS - Technical Architecture Document

**Version**: 1.0  
**Date**: September 2025  

---

## 1. System Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│  Frontend Layer: Next.js 14 + PWA + Admin Dashboard        │
├─────────────────────────────────────────────────────────────┤
│  API Gateway: Authentication + Rate Limiting + Load Balance │
├─────────────────────────────────────────────────────────────┤
│  Services: Auth | Farmer | Production | Inventory | Sales  │
│            Finance | Analytics | Notifications             │
├─────────────────────────────────────────────────────────────┤
│  Data Layer: PostgreSQL + Redis + S3 + Message Queue       │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, PWA
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 15+ (primary), Redis (cache)
- **Storage**: AWS S3 (files), CloudFront (CDN)
- **Infrastructure**: AWS ECS/Fargate, RDS, ElastiCache

---

## 2. Database Schema (Core Tables)

### Authentication & Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    mill_id UUID REFERENCES mills(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE user_role AS ENUM ('super_admin', 'mill_owner', 'manager', 'operator', 'accountant');

CREATE TABLE mills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    address TEXT,
    capacity_tons_per_day DECIMAL(10,2),
    gst_number VARCHAR(15),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Farmer Management
```sql
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    farmer_code VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    village VARCHAR(100),
    credit_limit DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Procurement & Production
```sql
CREATE TABLE paddy_intakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    farmer_id UUID REFERENCES farmers(id) NOT NULL,
    intake_number VARCHAR(50) UNIQUE NOT NULL,
    intake_date DATE NOT NULL,
    gross_weight DECIMAL(10,3) NOT NULL,
    net_weight DECIMAL(10,3) NOT NULL,
    moisture_percentage DECIMAL(5,2),
    rate_per_kg DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milling_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    batch_date DATE NOT NULL,
    total_paddy_weight DECIMAL(10,3) NOT NULL,
    status batch_status DEFAULT 'planned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE batch_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');
```

### Inventory & Products
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    unit_of_measurement unit_type NOT NULL,
    default_sale_price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true
);

CREATE TYPE unit_type AS ENUM ('kg', 'quintal', 'ton', 'bag');

CREATE TABLE inventory_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    current_quantity DECIMAL(12,3) NOT NULL DEFAULT 0,
    minimum_stock_level DECIMAL(12,3) DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sales & Financial
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    customer_code VARCHAR(50) UNIQUE NOT NULL,
    business_name VARCHAR(255),
    contact_person VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    credit_limit DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE sales_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    order_status order_status DEFAULT 'pending',
    created_by UUID REFERENCES users(id) NOT NULL
);

CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'delivered', 'cancelled');

CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mill_id UUID REFERENCES mills(id) NOT NULL,
    transaction_number VARCHAR(50) UNIQUE NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_type transaction_type NOT NULL,
    party_type party_type,
    party_id UUID,
    total_amount DECIMAL(15,2) NOT NULL,
    payment_method payment_method,
    status transaction_status DEFAULT 'completed'
);

CREATE TYPE transaction_type AS ENUM ('receipt', 'payment');
CREATE TYPE party_type AS ENUM ('farmer', 'customer', 'supplier');
CREATE TYPE payment_method AS ENUM ('cash', 'bank_transfer', 'upi', 'cheque');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'cancelled');
```

---

## 3. API Architecture

### Core Endpoints
```typescript
// Authentication
POST /auth/login
POST /auth/refresh
POST /auth/logout

// Farmers
GET    /farmers
POST   /farmers
GET    /farmers/:id
PUT    /farmers/:id
GET    /farmers/:id/balance

// Procurement
GET    /paddy-intakes
POST   /paddy-intakes
GET    /paddy-intakes/:id
POST   /paddy-intakes/:id/receipt

// Production
GET    /milling-batches
POST   /milling-batches
POST   /milling-batches/:id/start
POST   /milling-batches/:id/complete

// Sales
GET    /sales/orders
POST   /sales/orders
GET    /customers
POST   /customers

// Inventory
GET    /inventory/stock
POST   /inventory/movements

// Financial
GET    /financial/transactions
POST   /financial/payments
GET    /financial/reports/summary

// Analytics
GET    /analytics/dashboard
GET    /reports/daily-summary
```

### Authentication Flow
```typescript
interface JWTPayload {
  sub: string;      // User ID
  email: string;    // User email
  role: UserRole;   // User role
  millId: string;   // Mill ID
  iat: number;      // Issued at
  exp: number;      // Expires at
}
```

---

## 4. System Features

### Core Modules
1. **User Management**: Role-based access, multi-mill support
2. **Farmer Management**: Registration, credit tracking, history
3. **Procurement**: Paddy intake, quality testing, receipts
4. **Production**: Batch processing, yield tracking
5. **Inventory**: Stock management, movements, alerts
6. **Sales**: Order management, customer relations
7. **Financial**: Payments, ledgers, reporting
8. **Analytics**: Dashboard, reports, insights

### Key Features
- **Offline-First PWA**: Works without internet
- **Multi-Mill Support**: Manage multiple locations
- **Real-Time Updates**: Live inventory and financial data
- **Mobile Optimized**: Touch-friendly interface
- **Audit Trail**: Complete transaction history
- **Role-Based Security**: Granular permissions
- **Automated Calculations**: Yield, pricing, taxes
- **Report Generation**: PDF/Excel exports

---

## 5. Performance & Security

### Database Optimization
```sql
-- Critical indexes for performance
CREATE INDEX idx_farmers_mill_phone ON farmers(mill_id, phone);
CREATE INDEX idx_paddy_intakes_date ON paddy_intakes(intake_date DESC);
CREATE INDEX idx_sales_orders_date ON sales_orders(order_date DESC);
CREATE INDEX idx_financial_transactions_date ON financial_transactions(transaction_date DESC);
```

### Security Measures
- **JWT Authentication** with refresh tokens
- **Role-based access control** (RBAC)
- **API rate limiting** to prevent abuse
- **Data encryption** at rest and in transit
- **Audit logging** for all data changes
- **Input validation** and sanitization
- **HTTPS enforcement** for all communications

### Scalability
- **Microservices architecture** for independent scaling
- **Database connection pooling** for efficiency
- **Redis caching** for frequently accessed data
- **CDN delivery** for static assets
- **Horizontal scaling** with load balancers

---

## 6. Deployment Architecture

### AWS Infrastructure
```yaml
Services:
  - ECS/Fargate: Containerized application hosting
  - RDS PostgreSQL: Primary database
  - ElastiCache Redis: Caching and sessions
  - S3: File storage (documents, images)
  - CloudFront: Global CDN
  - Route53: DNS management
  - ALB: Load balancing
  - CloudWatch: Monitoring and logging
```

### Environment Setup
- **Development**: Local Docker containers
- **Staging**: AWS staging environment
- **Production**: Multi-AZ AWS deployment
- **CI/CD**: GitHub Actions pipeline
- **Monitoring**: DataDog + AWS CloudWatch

This architecture provides a solid foundation for building a scalable, secure, and efficient rice mill management system.