const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Sample products data
const sampleProducts = [
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in traditional Indian spices, served with mint chutney",
    price: 250,
    category: "appetizers",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken, aromatic spices, and caramelized onions",
    price: 350,
    category: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Vegetable Biryani",
    description: "Aromatic rice dish with fresh vegetables, herbs, and traditional spices",
    price: 280,
    category: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato-based gravy with cream and butter",
    price: 320,
    category: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Dal Makhani",
    description: "Slow-cooked black lentils with cream and aromatic spices",
    price: 180,
    category: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Gulab Jamun",
    description: "Soft milk-solid balls soaked in rose-flavored sugar syrup",
    price: 120,
    category: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Rasmalai",
    description: "Soft cottage cheese patties soaked in sweetened, thickened milk",
    price: 140,
    category: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk and aromatic spices",
    price: 50,
    category: "beverages",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Lassi",
    description: "Refreshing yogurt-based drink with cardamom and saffron",
    price: 80,
    category: "beverages",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 60,
    category: "appetizers",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    status: "active",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seedProducts() {
  console.log('🌱 Seeding products...');
  
  try {
    const batch = db.batch();
    
    sampleProducts.forEach(product => {
      const docRef = db.collection('products').doc();
      batch.set(docRef, product);
    });
    
    await batch.commit();
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
}

async function createAdminUser() {
  console.log('👤 Creating admin user...');
  
  try {
    // Create admin user in Authentication
    const adminUser = await admin.auth().createUser({
      email: 'admin@example.com',
      password: 'admin123',
      displayName: 'Admin User'
    });
    
    // Create admin profile in Firestore
    await db.collection('users').doc(adminUser.uid).set({
      displayName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('ℹ️ Admin user already exists');
    } else {
      console.error('❌ Error creating admin user:', error);
    }
  }
}

async function createSampleOrders() {
  console.log('📦 Creating sample orders...');
  
  try {
    const sampleOrders = [
      {
        orderNumber: 'ORD001',
        customerName: 'John Doe',
        userEmail: 'john@example.com',
        items: [
          { name: 'Paneer Tikka', price: 250, quantity: 2 },
          { name: 'Butter Chicken', price: 320, quantity: 1 }
        ],
        subtotal: 820,
        tax: 82,
        deliveryCharge: 50,
        total: 952,
        status: 'confirmed',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        orderNumber: 'ORD002',
        customerName: 'Jane Smith',
        userEmail: 'jane@example.com',
        items: [
          { name: 'Chicken Biryani', price: 350, quantity: 1 },
          { name: 'Gulab Jamun', price: 120, quantity: 2 }
        ],
        subtotal: 590,
        tax: 59,
        deliveryCharge: 50,
        total: 699,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];
    
    const batch = db.batch();
    
    sampleOrders.forEach(order => {
      const docRef = db.collection('orders').doc();
      batch.set(docRef, order);
    });
    
    await batch.commit();
    console.log('✅ Sample orders created successfully!');
  } catch (error) {
    console.error('❌ Error creating sample orders:', error);
  }
}

async function main() {
  console.log('🚀 Starting database seeding...\n');
  
  await seedProducts();
  await createAdminUser();
  await createSampleOrders();
  
  console.log('\n🎉 Database seeding completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Visit admin.html and login with admin@example.com / admin123');
  console.log('2. Add more products through the admin panel');
  console.log('3. Test the user registration and ordering flow');
  
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
