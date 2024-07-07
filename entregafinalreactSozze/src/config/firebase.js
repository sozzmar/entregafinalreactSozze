// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { productos } from "../data/asyncBenita"
import { addDoc, collection, getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEnbc9i6xFo6cySZe_HcgkkQmnQsjcDSo",
  authDomain: "tienda-benita.firebaseapp.com",
  projectId: "tienda-benita",
  storageBucket: "tienda-benita.appspot.com",
  messagingSenderId: "529022466885",
  appId: "1:529022466885:web:fb857af236de56bd659c2c"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

/*productos.forEach((prod) => {
    addDoc(collection(db, 'productos'), prod)
    .then((elem) => console.log (`se agrego el producto id ${elem.id}`))
    .catch ((error) => console.log(error));
});*/