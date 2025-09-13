# Advanced Development Best Practices for RiceMillOS

## Testing Strategy & TDD Implementation

### 1. Test-Driven Development (TDD) Workflow

#### The Red-Green-Refactor Cycle
```bash
# 1. RED: Write failing tests first
npm run test:watch PaddyIntakeForm.test.tsx

# 2. GREEN: Write minimal code to pass tests
# Implement component with basic functionality

# 3. REFACTOR: Improve code quality while keeping tests green
# Optimize performance, clean up code, add error handling
```

#### TDD Best Practices
- **Write tests before implementation** - Forces better design
- **Test behavior, not implementation** - More resilient tests
- **One test case at a time** - Focus on single functionality
- **Meaningful test descriptions** - Clear intent and expectations

### 2. Testing Pyramid Strategy

```
                    /\
                   /  \
              E2E Tests (5%)
                 /    \
                /      \
           Integration (15%)
              /        \
             /          \
        Unit Tests (80%)
           /__________\
```

#### Unit Tests (80% of test suite)
```typescript
// Test individual components, functions, hooks
describe('PaddyIntakeForm', () => {
  it('should validate weight is positive number', async () => {
    // Test specific validation logic
  });
});
```

#### Integration Tests (15% of test suite)
```typescript
// Test component interactions and API integration
describe('Authentication Integration', () => {
  it('should complete full login workflow', async () => {
    // Test complete user flows
  });
});
```

#### E2E Tests (5% of test suite)
```typescript
// Test complete user journeys
describe('Paddy Intake Process', () => {
  it('should allow farmer to complete intake registration', () => {
    // Test full business workflow
  });
});
```

### 3. Advanced Testing Patterns

#### Page Object Model for E2E Tests
```typescript
class PaddyIntakePage {
  async fillFarmerDetails(farmer: string) {
    await page.selectOption('[data-testid="farmer-select"]', farmer);
  }
  
  async submitIntake() {
    await page.click('[data-testid="submit-button"]');
  }
}
```

#### Test Data Factories
```typescript
const createTestFarmer = (overrides = {}) => ({
  id: faker.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  ...overrides,
});
```

#### Mock Strategy
```typescript
// Mock external dependencies, not implementation details
jest.mock('@/hooks/useSupabase', () => ({
  useSupabase: () => ({
    from: jest.fn(() => mockQueryBuilder),
  }),
}));
```

## Code Quality & Standards

### 4. TypeScript Best Practices

#### Strict Type Safety
```typescript
// Enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### Type-First Development
```typescript
// Define types before implementation
interface PaddyIntake {
  readonly id: string;
  farmerId: string;
  weight: number;
  moistureContent: number;
  qualityGrade: 'A' | 'B' | 'C';
  pricePerKg: number;
  totalAmount: number;
  intakeDate: Date;
}

// Use discriminated unions for state management
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

### 5. Component Architecture Patterns

#### Compound Components Pattern
```typescript
// For complex UI components
const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};

// Usage
<Modal.Root>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal.Root>
```

#### Render Props Pattern
```typescript
// For shared behavior
function DataFetcher<T>({ 
  url, 
  children 
}: { 
  url: string; 
  children: (data: AsyncState<T>) => ReactNode 
}) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });
  
  return children(state);
}
```

#### Custom Hooks for Business Logic
```typescript
// Separate business logic from UI
function usePaddyIntakeForm() {
  const [formData, setFormData] = useState(initialState);
  
  const submitIntake = useCallback(async (data) => {
    // Business logic here
  }, []);
  
  return { formData, submitIntake, isLoading, error };
}
```

### 6. Performance Optimization

#### React Performance Patterns
```typescript
// Memoization for expensive calculations
const TotalCalculator = memo(({ weight, price }: Props) => {
  const total = useMemo(() => 
    weight * price, [weight, price]
  );
  
  return <div>{total}</div>;
});

// Virtualization for large lists
import { FixedSizeList as List } from 'react-window';

function FarmerList({ farmers }: { farmers: Farmer[] }) {
  return (
    <List
      height={600}
      itemCount={farmers.length}
      itemSize={50}
    >
      {FarmerRow}
    </List>
  );
}
```

#### Code Splitting
```typescript
// Route-based splitting
const PaddyIntakePage = lazy(() => import('./PaddyIntakePage'));

// Component-based splitting
const HeavyChart = lazy(() => import('./HeavyChart'));
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Set performance budgets
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    }
  ]
}
```

## Security Best Practices

### 7. Frontend Security

#### Input Validation & Sanitization
```typescript
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Schema validation
const userInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  weight: z.number().positive().max(10000),
});

// XSS Prevention
const sanitizeInput = (input: string) => DOMPurify.sanitize(input);
```

#### Secure API Calls
```typescript
// CSRF Protection
const apiCall = async (url: string, data: unknown) => {
  const csrfToken = getCsrfToken();
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data),
  });
};
```

#### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval';"
  }
];
```

### 8. Data Protection

#### Sensitive Data Handling
```typescript
// Never log sensitive data
const logSafeData = (data: PaddyIntake) => {
  const { pricePerKg, totalAmount, ...safeData } = data;
  console.log('Processing intake:', safeData);
};

// Encrypt sensitive data
import crypto from 'crypto';

const encryptSensitiveData = (data: string) => {
  const cipher = crypto.createCipher('aes192', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};
```

## Database & API Design

### 9. Database Best Practices

#### Row Level Security (RLS)
```sql
-- Farmer data access
CREATE POLICY "Users can only see their mill's farmers" ON farmers
  FOR SELECT USING (mill_id = auth.jwt() ->> 'mill_id');

-- Audit trails
CREATE POLICY "Audit log access" ON audit_logs
  FOR SELECT USING (
    auth.role() = 'service_role' OR 
    user_id = auth.uid()
  );
```

#### Optimized Queries
```sql
-- Indexes for common queries
CREATE INDEX idx_paddy_intakes_farmer_date 
ON paddy_intakes(farmer_id, intake_date);

-- Partial indexes for filtering
CREATE INDEX idx_active_farmers 
ON farmers(mill_id) WHERE is_active = true;
```

### 10. API Design Patterns

#### RESTful API Design
```typescript
// Resource-based URLs
GET    /api/farmers              // List farmers
POST   /api/farmers              // Create farmer
GET    /api/farmers/:id          // Get farmer
PUT    /api/farmers/:id          // Update farmer
DELETE /api/farmers/:id          // Delete farmer

// Nested resources
GET    /api/farmers/:id/intakes  // Get farmer's intakes
POST   /api/farmers/:id/intakes  // Create intake for farmer
```

#### Error Handling
```typescript
// Consistent error format
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Error response handler
export function handleApiError(error: unknown): ApiError {
  if (error instanceof z.ZodError) {
    return {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input data',
      details: error.errors,
      timestamp: new Date().toISOString(),
    };
  }
  
  return {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
  };
}
```

## Development Workflow

### 11. Git Workflow

#### Conventional Commits
```bash
# Commit message format
type(scope): description

# Examples
feat(paddy-intake): add moisture content validation
fix(auth): resolve session timeout issue
test(farmers): add integration tests for farmer CRUD
docs(api): update endpoint documentation
```

#### Branch Strategy
```bash
# Feature branches
git checkout -b feature/paddy-intake-form
git checkout -b fix/farmer-validation
git checkout -b test/integration-auth

# Pre-commit hooks
npm install husky lint-staged
```

### 12. Code Review Process

#### Review Checklist
- [ ] Tests written and passing
- [ ] TypeScript types properly defined
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] Documentation updated

#### Review Comments
```typescript
// Good: Specific and actionable
// Consider using useMemo here for better performance
const expensiveCalculation = useMemo(() => {
  return heavyComputation(data);
}, [data]);

// Consider: Does this need to be async?
// This function doesn't seem to perform any async operations
```

### 13. Deployment & DevOps

#### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: npm run test:ci
      
      - name: Check types
        run: npm run type-check
      
      - name: Lint code
        run: npm run lint
      
      - name: Build application
        run: npm run build
```

#### Environment Management
```typescript
// config/environment.ts
export const config = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    logLevel: 'debug',
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    logLevel: 'error',
  },
};
```

### 14. Monitoring & Analytics

#### Error Tracking
```typescript
// utils/errorTracking.ts
export function trackError(error: Error, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service
    errorTracker.captureException(error, context);
  } else {
    console.error('Error:', error, context);
  }
}
```

#### Performance Monitoring
```typescript
// utils/performance.ts
export function measurePageLoad() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      analytics.track('page_load_time', { duration: loadTime });
    });
  }
}
```

## Additional Tools & Utilities

### 15. Development Tools

#### Useful VSCode Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "orta.vscode-jest"
  ]
}
```

#### Package Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

### 16. Architecture Documentation

#### Decision Records (ADRs)
```markdown
# ADR-001: State Management Strategy

## Status
Accepted

## Context
Need to decide on state management approach for complex forms and global state.

## Decision
Use Zustand for global state, React Hook Form for form state.

## Consequences
- Reduced bundle size compared to Redux
- Simpler learning curve
- Better TypeScript integration
```

This comprehensive guide provides advanced development practices for building scalable, maintainable, and secure web applications. Follow these patterns to ensure high code quality and robust applications.