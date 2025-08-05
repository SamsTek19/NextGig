# NextGig - Gigs with Dignity, Growth with Purpose

NextGig is a comprehensive web application designed to connect freelancers and job seekers with verified opportunities while supporting skill development and small business growth. Built with modern web development practices, it focuses on accessibility, mobile responsiveness, and a welcoming experience for underserved communities.

## 🌟 Core Features

### User Authentication
- Secure sign-up/login for freelancers, businesses, and admins
- Firebase Authentication integration
- Role-based access control (Freelancer, Business, Admin)

### Gig Marketplace
- Searchable, filterable job board for gigs
- Optimized for fair pay and verified listings
- Skill relevance matching
- Location-based filtering
- Real-time updates

### Profile & Skill Tracker
- User dashboards with gig history
- Ratings and reviews system
- Skill badges showing growth over time
- Professional portfolio management
- Performance analytics

### Skill Hub
- Course discovery section
- Free and paid resources
- Tech, trades, and entrepreneurship focus
- Learning paths and progress tracking
- Skill certification system

### Microbusiness Dashboard
- Tools for invoicing and payment tracking
- Inventory management
- Performance analytics
- Customer relationship management
- Financial reporting

### Worker Rights Info Center
- Informational pages covering labor laws
- Workplace safety guidelines
- Rights awareness and education
- Resource links and contact information
- Legal protection information

## 🎨 Design Theme

- **Color Scheme**: Blue and white for professionalism, trust, and clarity
- **Typography**: Clean typography using 'Segoe UI' and 'Roboto'
- **Layout**: Spaced layouts with intuitive navigation
- **Responsive**: Optimized for both desktop and mobile users
- **Accessibility**: WCAG compliant design patterns

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (real-time data storage)
- **Hosting**: Firebase Hosting (deployment ready)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Emoji icons for cross-platform compatibility

## 📁 Project Structure

```
Hackathon/
├── index.html              # Main application entry point
├── app.js                  # Core application logic and routing
├── style.css               # Global styles and components
├── README.md              # Project documentation
└── view/                  # Application views
    ├── landing.html       # Landing page
    ├── auth.html          # Authentication page
    ├── dashboard.html     # Main dashboard
    ├── gigs.html         # Gig marketplace
    ├── profile.html      # User profile and skills
    ├── skill-hub.html    # Learning resources
    ├── business.html     # Microbusiness tools
    ├── rights.html       # Worker rights information
    ├── landing.css       # Landing page styles
    └── auth.css          # Authentication styles
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)
- Firebase project (for production)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Hackathon
   ```

2. **Set up Firebase (Optional for development)**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Update Firebase configuration in `app.js`

3. **Start local development server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Update the Firebase configuration in `app.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## 📱 Features in Detail

### Authentication System
- Email/password registration and login
- Role selection (Freelancer/Business)
- Form validation and error handling
- Password visibility toggle
- Responsive design

### Dashboard
- Overview of user activity
- Quick access to all features
- Role-based content display
- Navigation to all sections

### Gig Marketplace
- Search and filter functionality
- Category-based browsing
- Location and pay filtering
- Verified listing indicators
- Application tracking

### Profile Management
- User information display
- Skill tracking and badges
- Gig history and earnings
- Client reviews and ratings
- Professional portfolio

### Skill Development
- Course catalog with categories
- Learning path tracking
- Progress visualization
- Free and paid resources
- Skill certification

### Business Tools
- Invoice creation and management
- Inventory tracking
- Financial analytics
- Customer management
- Performance metrics

### Worker Rights
- Comprehensive legal information
- Safety guidelines
- Discrimination protection
- Resource links
- Emergency contacts

## 🎯 Target Users

### Freelancers & Job Seekers
- Find verified, fair-paying gigs
- Track skill development
- Build professional reputation
- Access learning resources
- Understand worker rights

### Small Business Owners
- Post verified job opportunities
- Manage business operations
- Track financial performance
- Access business tools
- Ensure compliance

### Underserved Communities
- Access to fair opportunities
- Educational resources
- Legal protection information
- Skill development support
- Community-focused design

## 🔒 Security Features

- Firebase Authentication
- Form validation
- Input sanitization
- Role-based access control
- Secure data transmission

## 📊 Performance

- Optimized for mobile devices
- Fast loading times
- Efficient data handling
- Responsive design
- Accessibility compliance

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- Google Fonts for typography
- Community contributors
- User feedback and testing

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

Stay updated with the latest features and improvements by checking the repository regularly.

---

**NextGig** - Empowering workers with dignity, growth, and purpose. 