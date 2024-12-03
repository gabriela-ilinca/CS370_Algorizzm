import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4ogUsphqIHVhaIle0U9infN2L5k6BRtY",
  authDomain: "harmonize-cc3a9.firebaseapp.com",
  projectId: "harmonize-cc3a9",
  storageBucket: "harmonize-cc3a9.firebasestorage.app",
  messagingSenderId: "1000648160117",
  appId: "1:1000648160117:web:00485f7ed47fd242c3193c",
  measurementId: "G-4X1RTG7GPV"
};


// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
