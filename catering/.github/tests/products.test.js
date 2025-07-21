// Sample unit tests for products.js
// To run: npx jest tests/products.test.js

const { addProduct, updateProduct } = require('../js/products');

describe('Products Module', () => {
  test('addProduct should throw if data is missing', async () => {
    await expect(addProduct({})).rejects.toThrow();
  });

  test('updateProduct should throw if productId is invalid', async () => {
    await expect(updateProduct(null, { name: 'Test' })).rejects.toThrow();
  });
}); 