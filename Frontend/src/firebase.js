// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOPxPiVBKv0WICe2_Zy5TYkVvoiU-cFHg",
  authDomain: "test-d2b29.firebaseapp.com",
  projectId: "test-d2b29",
  storageBucket: "test-d2b29.firebasestorage.app",
  messagingSenderId: "288831398549",
  appId: "1:288831398549:web:bd0e64b48c879c0bb3f19c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
