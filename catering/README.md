# CaterHub - Catering Reservation and Ordering System

A comprehensive web-based catering management system built with HTML, CSS, JavaScript, and Firebase. This system allows users to browse catering services, place orders, and enables administrators to manage products, orders, and users efficiently.

## 🚀 Features

### User Features
- **User Registration & Authentication**: Secure user registration and login system
- **Product Browsing**: Browse catering items by categories (Appetizers, Main Course, Desserts, Beverages)
- **Shopping Cart**: Add items to cart, modify quantities, and manage orders
- **Order Management**: Place orders, track order status, and view order history
- **User Profile**: Manage personal information and delivery addresses
- **Responsive Design**: Mobile-friendly interface for all devices

### Admin Features
- **Admin Dashboard**: Comprehensive overview of business metrics
- **Product Management**: Add, edit, and delete catering items
- **Order Management**: View and update order statuses
- **User Management**: Monitor user accounts and activities
- **Analytics**: Track sales, revenue, and business performance

### Technical Features
- **Real-time Database**: Firebase Firestore for data storage
- **File Storage**: Firebase Storage for product images
- **Authentication**: Firebase Authentication for secure user management
- **Logging System**: Comprehensive logging for debugging and monitoring
- **Responsive Design**: Mobile-first approach with Tailwind-inspired CSS
- **Performance Optimization**: Lazy loading and efficient data fetching

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Styling**: Custom CSS with responsive design principles
- **Icons**: Font Awesome
- **Architecture**: Modular JavaScript with class-based components

## 📁 Project Structure

\`\`\`
catering-system/
├── index.html              # Main landing page
├── admin.html              # Admin dashboard
├── user-dashboard.html     # User dashboard
├── styles/
│   ├── main.css           # Main stylesheet
│   ├── admin.css          # Admin-specific styles
│   └── user-dashboard.css # User dashboard styles
├── js/
│   ├── config.js          # Firebase configuration
│   ├── auth.js            # Authentication management
│   ├── products.js        # Product management
│   ├── cart.js            # Shopping cart functionality
│   ├── orders.js          # Order management
│   ├── admin.js           # Admin dashboard functionality
│   ├── user-dashboard.js  # User dashboard functionality
│   ├── logger.js          # Logging system
│   └── main.js            # Main application logic
└── README.md              # Project documentation
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/catering-system.git
   cd catering-system
   \`\`\`

2. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Enable Storage
   - Get your Firebase configuration

3. **Configure Firebase**
   - Open \`js/config.js\`
   - Replace the placeholder configuration with your Firebase config:
   \`\`\`javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   \`\`\`

4. **Set up Admin Account**
   - Update the \`ADMIN_EMAIL\` constant in \`js/config.js\`
   - Register with this email to get admin access

5. **Deploy the Application**
   - Use Firebase Hosting, Netlify, or any static hosting service
   - Or run locally using a local server (e.g., Live Server extension in VS Code)

### Firebase Security Rules

**Firestore Rules:**
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all, writable by admin only
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Orders are readable by owner and admin, writable by owner
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // Logs are writable by authenticated users, readable by admin
    match /logs/{logId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
\`\`\`

**Storage Rules:**
\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

## 📱 Usage

### For Users
1. **Registration**: Create an account using email and password
2. **Browse Products**: Explore different categories of catering items
3. **Add to Cart**: Select items and add them to your shopping cart
4. **Place Order**: Complete your order with delivery information
5. **Track Orders**: Monitor your order status in the user dashboard

### For Administrators
1. **Login**: Use admin credentials to access the admin panel
2. **Manage Products**: Add new items, update existing ones, or remove items
3. **Process Orders**: View incoming orders and update their status
4. **Monitor Users**: Keep track of user registrations and activities
5. **View Analytics**: Monitor business performance and revenue

## 🔧 Configuration

### Environment Variables
The system uses Firebase configuration which should be set in \`js/config.js\`:

- \`apiKey\`: Firebase API key
- \`authDomain\`: Firebase auth domain
- \`projectId\`: Firebase project ID
- \`storageBucket\`: Firebase storage bucket
- \`messagingSenderId\`: Firebase messaging sender ID
- \`appId\`: Firebase app ID

### Application Settings
Modify \`APP_CONFIG\` in \`js/config.js\` to customize:

- \`currency\`: Currency symbol (default: ₹)
- \`taxRate\`: Tax rate for orders (default: 0.18 for 18% GST)
- \`deliveryCharge\`: Delivery fee (default: 50)

## 🧪 Testing

### Manual Testing Checklist

**User Authentication:**
- [ ] User registration works correctly
- [ ] User login/logout functionality
- [ ] Admin login with special privileges
- [ ] Password validation and error handling

**Product Management:**
- [ ] Products load correctly on homepage
- [ ] Category filtering works
- [ ] Product details modal displays properly
- [ ] Admin can add/edit/delete products

**Shopping Cart:**
- [ ] Items can be added to cart
- [ ] Quantity can be modified
- [ ] Items can be removed from cart
- [ ] Cart persists across sessions

**Order Management:**
- [ ] Orders can be placed successfully
- [ ] Order history displays correctly
- [ ] Admin can view and update order status
- [ ] Order status updates reflect in user dashboard

**Responsive Design:**
- [ ] Mobile navigation works properly
- [ ] All pages are mobile-friendly
- [ ] Touch interactions work on mobile devices

### Test Data
Create test products with the following categories:
- Appetizers: Samosas, Spring Rolls, Pakoras
- Main Course: Biryani, Curry, Dal
- Desserts: Gulab Jamun, Rasgulla, Kheer
- Beverages: Lassi, Chai, Fresh Juice

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: \`npm install -g firebase-tools\`
2. Login to Firebase: \`firebase login\`
3. Initialize hosting: \`firebase init hosting\`
4. Deploy: \`firebase deploy\`

### Other Hosting Options
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable Pages in repository settings

## 🔒 Security Considerations

1. **Firebase Security Rules**: Properly configured to restrict data access
2. **Input Validation**: All user inputs are validated on both client and server
3. **Authentication**: Secure user authentication with Firebase Auth
4. **Data Sanitization**: User data is sanitized before storage
5. **HTTPS**: Always use HTTPS in production
6. **Admin Access**: Admin privileges are properly restricted

## 📊 Performance Optimization

1. **Image Optimization**: Images are compressed and served in appropriate formats
2. **Lazy Loading**: Products are loaded as needed
3. **Caching**: Browser caching is utilized for static assets
4. **Minification**: CSS and JavaScript are minified for production
5. **CDN**: Firebase provides global CDN for fast content delivery

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Issues:**
- Verify Firebase configuration in \`config.js\`
- Check Firebase project settings
- Ensure Firestore and Authentication are enabled

**Authentication Problems:**
- Check Firebase Authentication settings
- Verify email/password provider is enabled
- Check browser console for error messages

**Product Images Not Loading:**
- Verify Firebase Storage is enabled
- Check storage security rules
- Ensure images are uploaded correctly

**Mobile Responsiveness Issues:**
- Test on actual devices
- Use browser developer tools
- Check CSS media queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit changes: \`git commit -am 'Add feature'\`
4. Push to branch: \`git push origin feature-name\`
5. Submit a pull request

### Coding Standards
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ standards
- Add comments for complex logic
- Use meaningful variable and function names
- Follow CSS BEM methodology for styling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Firebase for providing excellent backend services
- Font Awesome for beautiful icons
- The open-source community for inspiration and resources
- Traditional Indian cuisine for the cultural inspiration

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@caterhub.com
- Documentation: [Project Wiki](https://github.com/yourusername/catering-system/wiki)

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added user dashboard and improved mobile responsiveness
- **v1.2.0** - Enhanced admin panel with analytics
- **v1.3.0** - Added comprehensive logging system

---

**Built with ❤️ for promoting traditional Indian catering culture**
\`\`\`
