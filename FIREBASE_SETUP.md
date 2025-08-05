# Firebase Setup Guide for NextGig Application System

This guide will help you set up Firebase to enable application data storage and file uploads for the NextGig platform.

## Prerequisites

1. A Google account
2. Basic knowledge of Firebase console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "nextgig-applications")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Enable Firebase Storage

1. In your Firebase project console, go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" for development
4. Select a location for your storage (same as your database location)
5. Click "Done"

## Step 4: Get Your Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "NextGig Web App")
6. Copy the configuration object

## Step 5: Update Firebase Configuration

1. Open `project/src/firebase-config.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 6: Set Up Firestore Security Rules

1. In Firebase Console, go to "Firestore Database" > "Rules"
2. Update the rules to allow read/write access (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{applicationId} {
      allow read, write: if true; // For development only
    }
  }
}
```

## Step 7: Set Up Storage Security Rules

1. In Firebase Console, go to "Storage" > "Rules"
2. Update the rules to allow file uploads (for development):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /applications/{allPaths=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

## Step 8: Test the Setup

1. Open `project/src/apply.html` in your browser
2. Fill out the application form
3. Submit the form
4. Check Firebase Console to see if data is saved:
   - Go to "Firestore Database" to see application data
   - Go to "Storage" to see uploaded CV files

## Security Considerations for Production

Before deploying to production, update your security rules:

### Firestore Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{applicationId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules (Production)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /applications/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
```

## Features Implemented

✅ **Application Form Submission**: Users can submit job applications with personal details, CV upload, and cover letter

✅ **Firebase Integration**: 
- Application data saved to Firestore
- CV files uploaded to Firebase Storage
- Real-time data persistence

✅ **My Applications Page**: 
- Displays all submitted applications
- Shows application status with color-coded badges
- Allows viewing and deleting applications
- Responsive design for mobile devices

✅ **Local Storage Backup**: Applications are also saved locally for offline access

✅ **User Experience**: 
- Loading states during submission
- Success/error notifications
- Automatic redirect after successful submission
- Form validation

## File Structure

```
project/src/
├── apply.html          # Application form page
├── apply.js           # Form submission logic
├── applications.html   # My applications page
├── applications.js    # Applications display logic
├── applications.css   # Styling for applications page
└── firebase-config.js # Firebase configuration
```

## Troubleshooting

1. **Firebase not initialized**: Check your configuration in `firebase-config.js`
2. **Upload fails**: Verify Storage rules allow write access
3. **Data not saving**: Check Firestore rules and network connection
4. **CORS errors**: Ensure Firebase project is properly configured

## Next Steps

1. Implement user authentication
2. Add application status management
3. Create admin dashboard for reviewing applications
4. Add email notifications
5. Implement application search and filtering 