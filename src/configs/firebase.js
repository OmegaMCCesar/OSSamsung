// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,} from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEqbeFlhondbjsiQHKgmv1tAkOluEWsmE",
  authDomain: "samsungcodeclose.firebaseapp.com",
  projectId: "samsungcodeclose",
  storageBucket: "samsungcodeclose.firebasestorage.app",
  messagingSenderId: "1007687339261",
  appId: "1:1007687339261:web:429e5e3144d8cdf4df4294",
  measurementId: "G-Y2LTHV05CD"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistencia local establecida.');
  })
  .catch((error) => {
    console.error('Error al establecer la persistencia:', error);
  });


// Para obtener documentos de la colección

export { db, auth };