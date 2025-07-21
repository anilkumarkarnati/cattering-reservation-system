// Sample unit tests for search.js
// To run: npx jest tests/search.test.js

const { searchProducts } = require('../js/search');
 
describe('Search Module', () => {
  test('searchProducts should throw if query is missing', async () => {
    await expect(searchProducts(null)).rejects.toThrow();
  });
}); 