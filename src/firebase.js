import { initializeApp } from 'firebase/app'

// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDvUvbH2h0-PrLf6FCMynK4U0gSig3zCNc",
    authDomain: "tone-tracker-180fe.firebaseapp.com",
    projectId: "tone-tracker-180fe",
    storageBucket: "tone-tracker-180fe.appspot.com",
    messagingSenderId: "561688668921",
    appId: "1:561688668921:web:2c0557140daa3e64409028",
    measurementId: "G-GY0YZLMS01"
  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)