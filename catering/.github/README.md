# 🍽️ CateringPro - Traditional Indian Catering Platform

A comprehensive web application that connects rural Indian caterers with global customers, promoting traditional Indian culture and empowering local communities.

## 📋 Project Overview

CateringPro is designed to help rural towns sell their traditional catering services to customers worldwide. The platform prioritizes local caterers to develop their skills and promote authentic Indian culture through food.

### 🎯 Problem Statement
- Rural towns need a platform to promote and sell their catering services globally
- Traditional Indian caterers lack digital presence and global reach
- Need for a secure, mobile-friendly portal for ordering and management

### 🏗️ System Architecture
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Deployment**: Firebase Hosting

## 🚀 Features

### 👤 User Module
- ✅ User registration and login
- ✅ Product browsing and search
- ✅ Add to cart functionality
- ✅ Order placement and tracking
- ✅ Profile management
- ✅ Order history

### 👨‍💼 Admin Module
- ✅ Admin authentication
- ✅ Product management (Add, Edit, Delete)
- ✅ Order management and status updates
- ✅ Dashboard with analytics
- ✅ User management

### 🛒 Cart & Order System
- ✅ Shopping cart functionality
- ✅ Order placement with tax calculation
- ✅ Order status tracking
- ✅ Order history for users

### 📊 Logging & Analytics
- ✅ Comprehensive user action logging
- ✅ Firebase Analytics integration
- ✅ Error tracking and monitoring

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid (inline styles for simplicity)
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Font Awesome**: Icons and UI elements

### Backend & Database
- **Firebase Authentication**: Secure user management
- **Firestore**: NoSQL database for real-time data
- **Firebase Hosting**: Fast, secure hosting
- **Firebase Admin SDK**: Server-side operations

### Development Tools
- **ESLint**: Code quality and standards
- **Jest**: Unit and integration testing
- **Git**: Version control
- **GitHub**: Code repository and collaboration

## 📁 Project Structure

```
catering-pro/
├── public/                 # Static files
│   ├── index.html         # Main homepage
│   ├── admin.html         # Admin dashboard
│   └── user-dashboard.html # User dashboard
├── tests/                 # Test files
│   ├── setup.js          # Test setup
│   └── integration.test.js # Integration tests
├── scripts/              # Utility scripts
│   └── seed-data.js      # Database seeding
├── workflows/            # GitHub Actions
├── firebase.json         # Firebase configuration
├── package.json          # Dependencies and scripts
├── jest.config.js        # Jest configuration
├── README.md            # Project documentation
├── LLD.md               # Low-level design
├── ARCHITECTURE.md      # System architecture
└── PROJECT_REPORT.md    # Project report
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/catering-pro.git
   cd catering-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   ```bash
   # Install Firebase CLI globally
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase project
   firebase init
   ```

4. **Configure Firebase**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Firebase Hosting
   - Update `firebase.json` with your project ID

5. **Seed Database**
   ```bash
   # Create service account key and save as serviceAccountKey.json
   npm run seed
   ```

6. **Start Development Server**
   ```bash
   npm start
   ```

7. **Access the Application**
   - Main site: `http://localhost:5000`
   - Admin panel: `http://localhost:5000/admin.html`
   - User dashboard: `http://localhost:5000/user-dashboard.html`

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Unit tests
npm test -- --testPathPattern=unit

# Integration tests
npm test -- --testPathPattern=integration
```

### Test Coverage
```bash
npm test -- --coverage
```

## 📦 Deployment

### Deploy to Firebase
```bash
npm run deploy
```

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

## 🔧 Configuration

### Firebase Configuration
Update the Firebase config in your HTML files:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Environment Variables
Create a `.env` file for local development:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key
```

## 👥 User Roles

### Regular User
- Register and login
- Browse products
- Add items to cart
- Place orders
- View order history
- Manage profile

### Admin User
- Access admin dashboard
- Manage products (CRUD operations)
- View and update orders
- Monitor analytics
- Manage users

## 📊 Database Schema

### Collections

#### Users
```javascript
{
  uid: "string",
  displayName: "string",
  email: "string",
  phone: "string",
  address: "string",
  role: "user|admin",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

#### Products
```javascript
{
  id: "string",
  name: "string",
  description: "string",
  price: "number",
  category: "appetizers|main-course|desserts|beverages",
  imageUrl: "string",
  status: "active|inactive",
  createdAt: "timestamp",
  createdBy: "string"
}
```

#### Orders
```javascript
{
  id: "string",
  userId: "string",
  userEmail: "string",
  customerName: "string",
  items: "array",
  subtotal: "number",
  tax: "number",
  deliveryCharge: "number",
  total: "number",
  status: "pending|confirmed|delivered|cancelled",
  orderNumber: "string",
  createdAt: "timestamp"
}
```

#### Carts
```javascript
{
  userId: "string",
  items: "array",
  updatedAt: "timestamp"
}
```

#### Logs
```javascript
{
  timestamp: "string",
  action: "string",
  userId: "string",
  userEmail: "string",
  details: "object"
}
```

## 🔒 Security Features

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- Input validation and sanitization
- HTTPS enforcement
- CORS configuration
- Rate limiting (Firebase built-in)

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🚀 Performance Optimization

- Lazy loading of images
- Minified CSS and JavaScript
- Firebase CDN for fast loading
- Optimized database queries
- Caching strategies

## 🐛 Error Handling

- Comprehensive error logging
- User-friendly error messages
- Graceful degradation
- Fallback mechanisms

## 📈 Analytics & Monitoring

- Firebase Analytics integration
- User behavior tracking
- Performance monitoring
- Error tracking
- Custom event logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Standards

- ESLint configuration for code quality
- Prettier for code formatting
- Conventional commit messages
- Comprehensive documentation
- Unit and integration tests

## 🧪 Test Cases

### Authentication Tests
- User registration
- User login/logout
- Password reset
- Email verification

### Product Management Tests
- Product creation
- Product updates
- Product deletion
- Product listing

### Order Management Tests
- Order creation
- Order status updates
- Order history
- Order validation

### Cart Tests
- Add to cart
- Remove from cart
- Update quantities
- Cart persistence

### Admin Tests
- Admin authentication
- Product management
- Order management
- User management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development Team

- **Project Lead**: [Your Name]
- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 📞 Support

For support and questions:
- Email: support@cateringpro.com
- Phone: +91 98765 43210
- GitHub Issues: [Create an issue](https://github.com/yourusername/catering-pro/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added admin dashboard and analytics
- **v1.2.0** - Enhanced mobile responsiveness and performance

## 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Social media integration
- [ ] Advanced search and filtering

---

**Made with ❤️ for promoting traditional Indian culture through technology** 