// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB31W8sGEd4H2aatcxm5J7aRw__maKKarM",
  authDomain: "examen-719e7.firebaseapp.com",
  projectId: "examen-719e7",
  storageBucket: "examen-719e7.appspot.com",
  messagingSenderId: "106071484974",
  appId: "1:106071484974:web:0a3aca094cd427edf88dbf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
