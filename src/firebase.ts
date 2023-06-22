import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFXNKscabBDO7vqdEj-FGtcULJRcl3iLw",
  authDomain: "aprendo-d7760.firebaseapp.com",
  projectId: "aprendo-d7760",
  storageBucket: "aprendo-d7760.appspot.com",
  messagingSenderId: "1075628213785",
  appId: "1:1075628213785:web:d21a18f73bf2e75f6a4c88",
  measurementId: "G-9EWJ62HE2Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
