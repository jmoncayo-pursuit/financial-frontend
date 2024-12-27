import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  const renderSignUpForm = () => {
    return render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  };

  it('renders signup form', () => {
    renderSignUpForm();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Password')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Confirm Password')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('validates password strength', async () => {
    renderSignUpForm();

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'weak' } });

    expect(
      screen.getByText(/Password Strength: 0\/5/i)
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: { value: 'StrongPass123!' },
    });
    expect(
      screen.getByText(/Password Strength: [3-5]\/5/i)
    ).toBeInTheDocument();
  });

  it('validates password match', async () => {
    renderSignUpForm();

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'StrongPass123!' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Confirm Password'),
      {
        target: { value: 'StrongPass123!' },
      }
    );

    expect(screen.getByText(/passwords match/i)).toBeInTheDocument();
  });

  it('handles existing email error', async () => {
    renderSignUpForm();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'existing@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'StrongPass123!' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Confirm Password'),
      {
        target: { value: 'StrongPass123!' },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/email already exists/i)
      ).toBeInTheDocument();
    });
  });
});
