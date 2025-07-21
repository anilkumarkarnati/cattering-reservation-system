// Sample unit tests for cart.js
// To run: npx jest tests/cart.test.js

const { addToCart } = require('../js/cart');
 
describe('Cart Module', () => {
  test('addToCart should throw if productId is missing', async () => {
    await expect(addToCart(undefined, 1)).rejects.toThrow();
  });
}); 