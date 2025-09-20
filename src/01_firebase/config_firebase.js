// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgs2WyAI1e-dQ_D5NhsRnTOVReMtAacKg",
  authDomain: "se-3290-expedia-clone.firebaseapp.com",
  projectId: "se-3290-expedia-clone",
  storageBucket: "se-3290-expedia-clone.firebasestorage.app",
  messagingSenderId: "565202610559",
  appId: "1:565202610559:web:2c724e30f32c28eb85524a"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app