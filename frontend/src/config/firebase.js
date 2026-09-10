// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlFfRbXFELrWxhpV0xh68pWXpiPaJJ-EY",
  authDomain: "fishapp-147f6.firebaseapp.com",
  projectId: "fishapp-147f6",
  storageBucket: "fishapp-147f6.firebasestorage.app",
  messagingSenderId: "229458042952",
  appId: "1:229458042952:web:099fe6adbc474977faf87d",
  measurementId: "G-4XERPZ9GKY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
