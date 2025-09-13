/**
 * Integration Test Example: Authentication Flow
 * This demonstrates testing complete user workflows
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import LoginPage from '@/app/auth/login/page';
import { createMockApiResponse } from '../setup';

// Mock the authentication API
const mockSignIn = jest.fn();
const mockGetSession = jest.fn();

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
      getSession: mockGetSession,
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  }),
}));

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Flow', () => {
    it('should complete full login workflow successfully', async () => {
      const user = userEvent.setup();
      
      // Mock successful login
      mockSignIn.mockImplementation(() => 
        createMockApiResponse({ 
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'token' }
        })
      );

      renderWithProviders(<LoginPage />);

      // Fill in login form
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // Verify API call
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
      });

      // Verify success state
      await waitFor(() => {
        expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument();
      });
    });

    it('should handle login errors gracefully', async () => {
      const user = userEvent.setup();
      
      // Mock failed login
      mockSignIn.mockImplementation(() => 
        Promise.resolve({
          data: { user: null, session: null },
          error: { message: 'Invalid credentials' }
        })
      );

      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'wrong@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);

      // Verify error message appears
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Verify form is still interactive
      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(loginButton).not.toBeDisabled();
    });

    it('should validate form inputs before submission', async () => {
      const user = userEvent.setup();
      
      renderWithProviders(<LoginPage />);

      const loginButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(loginButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });

      // Should not call API
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  describe('Session Management', () => {
    it('should handle session restoration on page load', async () => {
      mockGetSession.mockResolvedValue({
        data: {
          session: {
            user: { id: '123', email: 'test@example.com' },
            access_token: 'token'
          }
        },
        error: null
      });

      renderWithProviders(<LoginPage />);

      await waitFor(() => {
        expect(mockGetSession).toHaveBeenCalled();
      });
    });

    it('should handle expired sessions', async () => {
      mockGetSession.mockResolvedValue({
        data: { session: null },
        error: { message: 'Session expired' }
      });

      renderWithProviders(<LoginPage />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      });
    });
  });
});