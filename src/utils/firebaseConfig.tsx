import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Platform } from "react-native";

const firebaseConfig = {
  // apiKey: "AIzaSyClIjwswKAwwo4Bw7aNgqU-hsm3p6VgET0",
  // authDomain: "auth-d603f.firebaseapp.com",
  // projectId: "auth-d603f",
  // storageBucket: "auth-d603f.firebasestorage.app",
  // messagingSenderId: "919528186068",
  // appId: "1:919528186068:web:a67669b0e5f34780d09b41",
  // measurementId: "G-HWVW1JEY7Z"
 
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let auth: any;
if (Platform.OS === 'web') {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

export { auth };