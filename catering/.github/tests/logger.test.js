// Sample unit tests for logger.js
// To run: npx jest tests/logger.test.js

const { logAction } = require('../js/logger');
 
describe('Logger Module', () => {
  test('logAction should not throw for valid input', () => {
    expect(() => logAction('LOGIN', { user: 'test' })).not.toThrow();
  });
}); 