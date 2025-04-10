// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Add Storage import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Example: import { getFirestore } from "firebase/firestore"; 

// Firebase configuration using Environment Variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if all required config variables are loaded
const requiredConfig = Object.values(firebaseConfig);
if (requiredConfig.some(value => !value)) {
  console.error("Firebase config is missing. Check your .env.local file and ensure all NEXT_PUBLIC_FIREBASE_ variables are set.");
  // Optionally throw an error or handle appropriately
  // throw new Error("Missing Firebase configuration");
}

// Initialize Firebase
// Prevent reinitialization on hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Storage and export it
const storage = getStorage(app);

// Example of exporting a Firebase service (optional, add as needed)
// const db = getFirestore(app);

export { app, storage }; // Export the initialized app instance and storage 
// export { db }; // Export other services as needed 