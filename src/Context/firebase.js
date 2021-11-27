import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM5nAp1qOb9F3YZZveuZAwdVK_jGV5OxU",
  authDomain: "devsunited-77341.firebaseapp.com",
  projectId: "devsunited-77341",
  storageBucket: "devsunited-77341.appspot.com",
  messagingSenderId: "496568895859",
  appId: "1:496568895859:web:67ffc577ba3e3d99925d06",
  measurementId: "G-SY7W0Y73NV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);