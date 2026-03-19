import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO3_2xIac8Jx2YN9ttwlornHA8t6AmAqA",
  authDomain: "inknpain-tattoo.firebaseapp.com",
  projectId: "inknpain-tattoo",
  storageBucket: "inknpain-tattoo.firebasestorage.app",
  messagingSenderId: "1071009920784",
  appId: "1:1071009920784:web:6256ee43e7f76bca895795"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
