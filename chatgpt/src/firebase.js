import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxAEytvRD_S1Pwm9c387wnm0_JHRuajLA",
  authDomain: "chatgpt-clone-9b25e.firebaseapp.com",
  projectId: "chatgpt-clone-9b25e",
  storageBucket: "chatgpt-clone-9b25e.firebasestorage.app",
  messagingSenderId: "713806873049",
  appId: "1:713806873049:web:a825d565e2d05c6fdd99c8",
  measurementId: "G-MVMML3L9F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };

