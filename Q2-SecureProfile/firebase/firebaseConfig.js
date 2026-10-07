// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDx5wvyvT7WhG63D3XeHSwt5L7IS3gMXe8",
//   authDomain: "studenttaskhub-e123f.firebaseapp.com",
//   projectId: "studenttaskhub-e123f",
//   storageBucket: "studenttaskhub-e123f.firebasestorage.app",
//   messagingSenderId: "529396423047",
//   appId: "1:529396423047:web:b044a72f846b7010abdb22"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

import { initializeApp, getApps, getApp } from "firebase/app";

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyDx5wvyvT7WhG63D3XeHSwt5L7IS3gMXe8",
  authDomain: "studenttaskhub-e123f.firebaseapp.com",
  projectId: "studenttaskhub-e123f",
  storageBucket: "studenttaskhub-e123f.firebasestorage.app",
  messagingSenderId: "529396423047",
  appId: "1:529396423047:web:b044a72f846b7010abdb22"
};


// Don't initialize Firebase App twice
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


let auth;

try {
  // First initialization
  auth = initializeAuth(app, {
    persistence:
      getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}


export { auth };

export const db = getFirestore(app);