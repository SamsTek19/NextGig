// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37yUXsB6Pk8VrTIog7TiR1L_OPZO5SRA",
  authDomain: "nextgig-5ab10.firebaseapp.com",
  projectId: "nextgig-5ab10",
  storageBucket: "nextgig-5ab10.firebasestorage.app",
  messagingSenderId: "604733323193",
  appId: "1:604733323193:web:da71409d9182b63cace868",
  measurementId: "G-13FM6RXNW2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Storage for file uploads
const storage = firebase.storage(); 