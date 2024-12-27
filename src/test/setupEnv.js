import { beforeAll } from 'vitest';

beforeAll(() => {
  // Set up test environment variables
  process.env.VITE_API_URL = 'http://localhost:5500';
});
