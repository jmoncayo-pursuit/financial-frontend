import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Mock server setup
export const server = setupServer(
  // Mock login endpoint
  http.post(
    'http://localhost:5500/api/login',
    async ({ request }) => {
      const { email, password } = await request.json();

      if (
        email === 'test@example.com' &&
        password === 'ValidPass123!'
      ) {
        return HttpResponse.json({ token: 'fake-token' });
      }
      return new HttpResponse(JSON.stringify('Invalid credentials'), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  ),

  // Mock signup endpoint
  http.post(
    'http://localhost:5500/api/signup',
    async ({ request }) => {
      const { email } = await request.json();

      if (email === 'existing@example.com') {
        return new HttpResponse(
          JSON.stringify('Email already exists'),
          {
            status: 409,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      return new HttpResponse(JSON.stringify('User created'), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
