import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWZVSe6u1J3WM8WXZ-s3ibRIJEkHhBMQk",
  authDomain: "dreamelevenclone.firebaseapp.com",
  projectId: "dreamelevenclone",
  storageBucket: "dreamelevenclone.appspot.com",
  messagingSenderId: "438326678548",
  appId: "1:438326678548:web:df3d8f83998c66c3ef4301",
  measurementId: "G-SC62SMG6E5",
};
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export default db;
