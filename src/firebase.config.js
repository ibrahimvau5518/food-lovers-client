import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfoBNjf9D2SBbEv7SCqICnOPdAzdpQaAA',
  authDomain: 'food-lovers-client.firebaseapp.com',
  projectId: 'food-lovers-client',
  storageBucket: 'food-lovers-client.firebasestorage.app',
  messagingSenderId: '933695062947',
  appId: '1:933695062947:web:ee03221a2d792410471016',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
