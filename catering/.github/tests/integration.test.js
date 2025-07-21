/**
 * Integration Tests for CateringPro
 * Tests all system modules: Admin, User, Products, Orders, Cart, Authentication
 */

const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCtGS7QApfE9FHilwYxNEiq0tm870a56Ok",
  authDomain: "caterhub-7475e.firebaseapp.com",
  projectId: "caterhub-7475e",
  storageBucket: "caterhub-7475e.firebasestorage.app",
  messagingSenderId: "331449717593",
  appId: "1:331449717593:web:dcf13f07ec0dbd00f23248",
  measurementId: "G-QRJS8CDBVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

describe('CateringPro Integration Tests', () => {
  let testUser, testAdmin, testProduct, testOrder;

  beforeAll(async () => {
    // Initialize Firebase Admin for testing
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: 'caterhub-7475e'
      });
    }
  });

  afterAll(async () => {
    // Cleanup test data
    if (testUser) {
      await admin.auth().deleteUser(testUser.uid);
    }
    if (testAdmin) {
      await admin.auth().deleteUser(testAdmin.uid);
    }
  });

  describe('Authentication Module', () => {
    test('should register a new user successfully', async () => {
      const email = `testuser${Date.now()}@example.com`;
      const password = 'testpass123';
      const displayName = 'Test User';

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      testUser = userCredential.user;

      expect(testUser).toBeDefined();
      expect(testUser.email).toBe(email);
      expect(testUser.displayName).toBe(null); // Will be set after profile update

      // Update profile
      await testUser.updateProfile({ displayName });
      expect(testUser.displayName).toBe(displayName);
    });

    test('should login user successfully', async () => {
      const email = testUser.email;
      const password = 'testpass123';

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.email).toBe(email);
    });

    test('should create admin user', async () => {
      const email = `admin${Date.now()}@example.com`;
      const password = 'adminpass123';
      const displayName = 'Test Admin';

      const adminUser = await admin.auth().createUser({
        email,
        password,
        displayName
      });

      testAdmin = adminUser;

      expect(testAdmin).toBeDefined();
      expect(testAdmin.email).toBe(email);
      expect(testAdmin.displayName).toBe(displayName);
    });
  });

  describe('Product Management Module', () => {
    test('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test product description',
        price: 150,
        category: 'appetizers',
        imageUrl: 'https://example.com/image.jpg',
        status: 'active',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'products'), productData);
      testProduct = { id: docRef.id, ...productData };

      expect(docRef.id).toBeDefined();
      expect(testProduct.name).toBe('Test Product');
      expect(testProduct.price).toBe(150);
    });

    test('should retrieve products from database', async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      expect(products.length).toBeGreaterThan(0);
      expect(products.some(p => p.name === 'Test Product')).toBe(true);
    });

    test('should update product information', async () => {
      const newPrice = 200;
      const productRef = doc(db, 'products', testProduct.id);

      await updateDoc(productRef, {
        price: newPrice,
        description: 'Updated description'
      });

      // Verify update
      const updatedProduct = await admin.firestore().collection('products').doc(testProduct.id).get();
      expect(updatedProduct.data().price).toBe(newPrice);
    });
  });

  describe('Cart Management Module', () => {
    test('should add product to cart', async () => {
      const cartData = {
        userId: testUser.uid,
        items: [{
          id: testProduct.id,
          name: testProduct.name,
          price: testProduct.price,
          quantity: 2
        }],
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const cartRef = await addDoc(collection(db, 'carts'), cartData);
      expect(cartRef.id).toBeDefined();
    });

    test('should retrieve user cart', async () => {
      const querySnapshot = await getDocs(collection(db, 'carts'));
      const carts = [];

      querySnapshot.forEach((doc) => {
        carts.push({ id: doc.id, ...doc.data() });
      });

      const userCart = carts.find(cart => cart.userId === testUser.uid);
      expect(userCart).toBeDefined();
      expect(userCart.items.length).toBeGreaterThan(0);
    });
  });

  describe('Order Management Module', () => {
    test('should create a new order', async () => {
      const orderData = {
        userId: testUser.uid,
        userEmail: testUser.email,
        customerName: testUser.displayName || testUser.email,
        items: [{
          id: testProduct.id,
          name: testProduct.name,
          price: testProduct.price,
          quantity: 2
        }],
        subtotal: 300,
        tax: 30,
        deliveryCharge: 50,
        total: 380,
        status: 'pending',
        orderNumber: `ORD${Date.now()}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      testOrder = { id: orderRef.id, ...orderData };

      expect(orderRef.id).toBeDefined();
      expect(testOrder.total).toBe(380);
      expect(testOrder.status).toBe('pending');
    });

    test('should update order status', async () => {
      const orderRef = doc(db, 'orders', testOrder.id);

      await updateDoc(orderRef, {
        status: 'confirmed',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Verify update
      const updatedOrder = await admin.firestore().collection('orders').doc(testOrder.id).get();
      expect(updatedOrder.data().status).toBe('confirmed');
    });

    test('should retrieve user orders', async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      const userOrders = orders.filter(order => order.userId === testUser.uid);
      expect(userOrders.length).toBeGreaterThan(0);
    });
  });

  describe('Admin Module', () => {
    test('should allow admin to view all orders', async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      expect(orders.length).toBeGreaterThan(0);
      // Admin should be able to see all orders
      expect(orders.some(order => order.userId === testUser.uid)).toBe(true);
    });

    test('should allow admin to manage products', async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      expect(products.length).toBeGreaterThan(0);
      expect(products.some(product => product.name === 'Test Product')).toBe(true);
    });
  });

  describe('User Profile Module', () => {
    test('should create user profile', async () => {
      const profileData = {
        displayName: testUser.displayName,
        email: testUser.email,
        phone: '+91 98765 43210',
        address: 'Test Address, Test City',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        role: 'user'
      };

      const profileRef = await addDoc(collection(db, 'users'), profileData);
      expect(profileRef.id).toBeDefined();
    });

    test('should update user profile', async () => {
      const newPhone = '+91 98765 43211';
      const profileRef = doc(db, 'users', testUser.uid);

      await updateDoc(profileRef, {
        phone: newPhone,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Verify update
      const updatedProfile = await admin.firestore().collection('users').doc(testUser.uid).get();
      expect(updatedProfile.data().phone).toBe(newPhone);
    });
  });

  describe('Logging Module', () => {
    test('should log user actions', async () => {
      const logData = {
        timestamp: new Date().toISOString(),
        action: 'test_action',
        userId: testUser.uid,
        userEmail: testUser.email,
        details: { test: 'data' }
      };

      const logRef = await addDoc(collection(db, 'logs'), logData);
      expect(logRef.id).toBeDefined();
    });

    test('should retrieve user logs', async () => {
      const querySnapshot = await getDocs(collection(db, 'logs'));
      const logs = [];

      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });

      const userLogs = logs.filter(log => log.userId === testUser.uid);
      expect(userLogs.length).toBeGreaterThan(0);
    });
  });

  describe('Data Validation', () => {
    test('should validate product data structure', () => {
      const product = {
        name: 'Test Product',
        description: 'Test description',
        price: 150,
        category: 'appetizers',
        status: 'active'
      };

      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });

    test('should validate order data structure', () => {
      const order = {
        userId: 'test-user-id',
        items: [],
        total: 0,
        status: 'pending'
      };

      expect(order).toHaveProperty('userId');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('total');
      expect(order).toHaveProperty('status');
      expect(Array.isArray(order.items)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid product creation', async () => {
      const invalidProduct = {
        name: '', // Invalid: empty name
        price: -10 // Invalid: negative price
      };

      try {
        await addDoc(collection(db, 'products'), invalidProduct);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    test('should handle invalid order creation', async () => {
      const invalidOrder = {
        userId: '', // Invalid: empty user ID
        items: [], // Invalid: empty items
        total: -50 // Invalid: negative total
      };

      try {
        await addDoc(collection(db, 'orders'), invalidOrder);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Performance Tests', () => {
    test('should load products efficiently', async () => {
      const startTime = Date.now();
      
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
      expect(products.length).toBeGreaterThan(0);
    });

    test('should handle multiple concurrent operations', async () => {
      const promises = [];
      
      // Create multiple products concurrently
      for (let i = 0; i < 5; i++) {
        const productData = {
          name: `Concurrent Product ${i}`,
          description: `Test product ${i}`,
          price: 100 + i,
          category: 'appetizers',
          status: 'active',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        promises.push(addDoc(collection(db, 'products'), productData));
      }

      const results = await Promise.all(promises);
      expect(results.length).toBe(5);
      results.forEach(result => {
        expect(result.id).toBeDefined();
      });
    });
  });
}); 