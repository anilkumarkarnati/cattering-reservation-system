// Sample unit tests for config.js
// To run: npx jest tests/config.test.js

const config = require('../js/config');

describe('Config Module', () => {
  test('config should have firebaseConfig property', () => {
    expect(config).toHaveProperty('firebaseConfig');
  });
}); 