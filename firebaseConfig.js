// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhtZLObI-uT4Qlu4Y2YK6CCTKTQh9DeDU",
  authDomain: "expofbchat-99ee4.firebaseapp.com",
  projectId: "expofbchat-99ee4",
  storageBucket: "expofbchat-99ee4.appspot.com",
  messagingSenderId: "229689532359",
  appId: "1:229689532359:web:00c8656455b3a0179583e2",
  measurementId: "G-G2LSRL7LSR",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");

export default app;
