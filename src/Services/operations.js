import { addDoc, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
import { auth } from "./firebase";

    //Posteo del tuit a la base de datos

    export const postData = async (col, data) => {
        try {
        const docRef = await addDoc(collection(db, col), data);
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    };

    //Registro de nuevo usuario con email y contraseña

    export const registerUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        window.location.replace("/login");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Se ha producido un error: " + errorMessage);
        });
    };

    //Fetch de la data de una coleccion

     export const getData = async (col) => {
        const collectionRef = collection(db, col);
        const snapData = await getDocs(collectionRef);
        const data = snapData.docs.map((doc) => doc.data());
        return data
   };

   //Captura del user que esta logeado

   export const getUserID = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const loggedUserID = user.uid;
            return loggedUserID;
          // https://firebase.google.com/docs/reference/js/firebase.User
          // ...
        } else {
          console.log("No user signed in");
        }
      });
   }