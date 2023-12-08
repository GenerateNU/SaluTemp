import { initializeApp } from 'firebase/app';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeAuth, setPersistence, getReactNativePersistence  } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB0Qru0AuADhXeZiAfw3xiWmr7PvpZjj6Q",
    authDomain: "salutemp-client.firebaseapp.com",
    projectId: "salutemp-client",
    storageBucket: "salutemp-client.appspot.com",
    messagingSenderId: "337676177477",
    appId: "1:337676177477:web:d25fb271f569160966932c",
    measurementId: "G-ZZGBDHJ1RW"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const saveToke = async (userId: string, token: string) => {
  const values = (await get(child(dbRef, `userTokens/${userId}/`))).val() ?? {};
  const payload = { ...values, token};
  set(ref(db, `userTokens/${userId}/`), payload);
}