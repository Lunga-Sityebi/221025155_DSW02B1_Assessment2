import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDx5wvyvT7WhG63D3XeHSwt5L7IS3gMXe8",
  authDomain: "studenttaskhub-e123f.firebaseapp.com",
  projectId: "studenttaskhub-e123f",
  storageBucket: "studenttaskhub-e123f.firebasestorage.app",
  messagingSenderId: "529396423047",
  appId: "1:529396423047:web:b84886831c38e214abdb22"
};

const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);