import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAq_aSyC47SZZh4bEuvkqutZyloKonuUrc",
  authDomain: "netflixclone-33a86.firebaseapp.com",
  projectId: "netflixclone-33a86",
  storageBucket: "netflixclone-33a86.appspot.com",
  messagingSenderId: "574326819448",
  appId: "1:574326819448:web:9064a9fa576c31d115fb8d",
  measurementId: "G-1PGDH3V7D7"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default storage;
