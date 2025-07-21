// Test setup file for Jest
// This file runs before each test file

// Mock Firebase for testing
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
  getApp: jest.fn(() => ({})),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(() => ({})),
  credential: {
    applicationDefault: jest.fn(),
    cert: jest.fn(),
  },
  auth: jest.fn(() => ({
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    getUser: jest.fn(),
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      get: jest.fn(),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(() => new Date()),
    },
  })),
}));

// Global test utilities
global.console = {
  ...console,
  // Uncomment to suppress console.log during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock DOM elements for browser-like environment
global.document = {
  getElementById: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
  createElement: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

global.window = {
  location: {
    href: '',
    reload: jest.fn(),
  },
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  sessionStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Test data utilities
global.createTestUser = () => ({
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
});

global.createTestProduct = () => ({
  id: 'test-product-id',
  name: 'Test Product',
  description: 'Test description',
  price: 150,
  category: 'appetizers',
  status: 'active',
});

global.createTestOrder = () => ({
  id: 'test-order-id',
  userId: 'test-user-id',
  items: [
    {
      id: 'test-product-id',
      name: 'Test Product',
      price: 150,
      quantity: 2,
    },
  ],
  total: 300,
  status: 'pending',
});

// Cleanup function
global.cleanupTestData = async () => {
  // Clean up any test data created during tests
  jest.clearAllMocks();
};

// Setup and teardown
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
}); 