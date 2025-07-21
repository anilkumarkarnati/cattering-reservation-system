// Sample unit tests for auth.js
// To run: npx jest tests/auth.test.js

const { registerUser, loginUser } = require('../js/auth');

describe('Auth Module', () => {
  test('registerUser should fail with invalid email', async () => {
    await expect(registerUser('invalid', 'password')).rejects.toThrow();
  });

  test('loginUser should fail with wrong credentials', async () => {
    await expect(loginUser('notfound@example.com', 'wrongpass')).rejects.toThrow();
  });
}); 