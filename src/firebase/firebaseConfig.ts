import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCvheTdYRXt-tlSiKh2HImZZHqMRTqB6TQ",
  authDomain: "coingecko-21600.firebaseapp.com",
  projectId: "coingecko-21600",
  storageBucket: "coingecko-21600.firebasestorage.app",
  messagingSenderId: "148972521890",
  appId: "1:148972521890:web:5612ac642a3b343327cafb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };