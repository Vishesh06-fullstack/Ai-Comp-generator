import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDuGZ-YDEVwAE-blpIAVyyM0362I-dDeqU",
  authDomain: "genz-ui-916f0.firebaseapp.com",
  projectId: "genz-ui-916f0",
  storageBucket: "genz-ui-916f0.firebasestorage.app",
  messagingSenderId: "52985880771",
  appId: "1:52985880771:web:466ca0c50e3d40505cc276"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);