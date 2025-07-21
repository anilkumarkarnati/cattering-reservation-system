// Sample unit tests for analytics.js
// To run: npx jest tests/analytics.test.js

const { trackEvent } = require('../js/analytics');
 
describe('Analytics Module', () => {
  test('trackEvent should throw if event name is missing', async () => {
    await expect(trackEvent(null, {})).rejects.toThrow();
  });
}); 