// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Q8UUsZoKgiIGl7zRd-zyHvQInwBVuyY",
  authDomain: "visions-44be9.firebaseapp.com",
  projectId: "visions-44be9",
  storageBucket: "visions-44be9.appspot.com",
  messagingSenderId: "747375029099",
  appId: "1:747375029099:web:2bb277c90cf018cd49fa2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};
