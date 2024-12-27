import { describe, it, expect, vi } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const mockSetIsAuthenticated = vi.fn();

  beforeEach(() => {
    // Clear mock before each test
    mockSetIsAuthenticated.mockClear();
    // Clear localStorage before each test
    localStorage.clear();
  });

  const renderLoginForm = () => {
    return render(
      <BrowserRouter>
        <LoginForm setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );
  };

  it('renders login form', () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Password')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'ValidPass123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

  it('handles login failure', async () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'WrongPass123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid credentials/i)
      ).toBeInTheDocument();
    });

    // Check that authentication state wasn't changed
    expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
