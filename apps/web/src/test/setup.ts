/**
 * Enhanced Test Setup and Utilities
 * This file contains advanced testing configurations and helper functions
 */

import { expect } from '@jest/globals';

// Custom Jest matchers for better assertions
expect.extend({
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid email`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid email`,
        pass: false,
      };
    }
  },

  toHaveLoadingState(received: HTMLElement) {
    const hasSpinner = received.querySelector('.spinner, [data-testid="loading"]');
    const hasLoadingText = received.textContent?.includes('Loading') || 
                          received.textContent?.includes('loading');
    const hasAriaLabel = received.getAttribute('aria-label')?.includes('loading');
    
    const pass = !!(hasSpinner || hasLoadingText || hasAriaLabel);
    
    if (pass) {
      return {
        message: () => `expected element not to have loading state`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have loading state (spinner, loading text, or aria-label)`,
        pass: false,
      };
    }
  }
});

// Custom type declarations for our matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEmail(): R;
      toHaveLoadingState(): R;
    }
  }
}

// Test data factories
export const createTestId = (component: string, element?: string) => {
  return element ? `${component}-${element}` : component;
};

// Mock data generators
export const generateMockData = {
  farmer: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'John Farmer',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Farm Road',
    registrationDate: new Date().toISOString(),
    isActive: true,
    ...overrides,
  }),

  paddyIntake: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    farmerId: 'farmer-123',
    weight: 1000,
    moistureContent: 14.5,
    qualityGrade: 'A',
    pricePerKg: 25.50,
    totalAmount: 25500,
    date: new Date().toISOString(),
    ...overrides,
  }),

  user: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    email: 'test@example.com',
    role: 'operator',
    profile: {
      fullName: 'Test User',
      phone: '+1234567890',
    },
    ...overrides,
  }),
};

// Performance testing helpers
export const measureRenderTime = async (renderFn: () => void) => {
  const start = performance.now();
  renderFn();
  const end = performance.now();
  return end - start;
};

// Accessibility testing helpers
export const checkAccessibility = (element: HTMLElement) => {
  const issues: string[] = [];

  // Check for alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.getAttribute('alt')) {
      issues.push(`Image at index ${index} is missing alt text`);
    }
  });

  // Check for form labels
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (id) {
      const label = element.querySelector(`label[for="${id}"]`);
      if (!label && !ariaLabel && !ariaLabelledBy) {
        issues.push(`Input at index ${index} is missing associated label`);
      }
    } else if (!ariaLabel && !ariaLabelledBy) {
      issues.push(`Input at index ${index} is missing label or aria-label`);
    }
  });

  // Check for heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (index === 0 && level !== 1) {
      issues.push('First heading should be h1');
    }
    if (level > lastLevel + 1) {
      issues.push(`Heading level skipped: h${lastLevel} to h${level}`);
    }
    lastLevel = level;
  });

  return issues;
};

// API mocking helpers
export const createMockApiResponse = <T>(data: T, options: {
  delay?: number;
  shouldFail?: boolean;
  errorMessage?: string;
} = {}) => {
  const { delay = 0, shouldFail = false, errorMessage = 'API Error' } = options;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(errorMessage));
      } else {
        resolve({ data, error: null });
      }
    }, delay);
  });
};

// Snapshot testing helpers
export const sanitizeSnapshot = (component: any) => {
  // Remove dynamic properties that change between test runs
  if (typeof component === 'object' && component !== null) {
    const sanitized = { ...component };
    delete sanitized.id;
    delete sanitized.timestamp;
    delete sanitized.createdAt;
    delete sanitized.updatedAt;
    return sanitized;
  }
  return component;
};