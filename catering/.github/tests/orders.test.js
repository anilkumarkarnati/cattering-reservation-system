// Sample unit tests for orders.js
// To run: npx jest tests/orders.test.js

const { placeOrder } = require('../js/orders');
 
describe('Orders Module', () => {
  test('placeOrder should throw if cart is empty', async () => {
    await expect(placeOrder([], 'userId')).rejects.toThrow();
  });
}); 