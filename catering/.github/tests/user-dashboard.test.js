// Sample unit tests for user-dashboard.js
// To run: npx jest tests/user-dashboard.test.js

const { updateProfile } = require('../js/user-dashboard');
 
describe('User Dashboard Module', () => {
  test('updateProfile should throw if userId is missing', async () => {
    await expect(updateProfile(null, { name: 'Test' })).rejects.toThrow();
  });
}); 