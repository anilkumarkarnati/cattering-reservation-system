// Sample unit tests for notifications.js
// To run: npx jest tests/notifications.test.js

const { sendNotification } = require('../js/notifications');
 
describe('Notifications Module', () => {
  test('sendNotification should throw if userId is missing', async () => {
    await expect(sendNotification(null, 'Order placed')).rejects.toThrow();
  });
}); 