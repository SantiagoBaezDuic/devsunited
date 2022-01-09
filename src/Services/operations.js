import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase";
import { auth } from "./firebase";

//Posteo del tuit a la base de datos

export const postData = async (col, data) => {
  try {
    const docRef = await addDoc(collection(db, col), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//Registro de nuevo usuario con email y contraseña

// export const registerUser = (email, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       window.location.replace("/login");
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       console.error("Se ha producido un error: " + errorMessage);
//     });
// };

//Fetch de la data de una coleccion

export const getData = async (col) => {
  const collectionRef = collection(db, col);
  const snapData = await getDocs(collectionRef);
  const data = snapData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

//Fetch de data de un documento específico

export const getDataByID = async (col, id) => {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
};

//Crear un documento con un id específico

export const setDocument = async (col, userId, data) => {
  const docRef = doc(db, col, userId);
  const docSnap = await setDoc(docRef, data);
  return docSnap;
};

//Updatear un doc en específico

export const updateData = async (col, docId, newData) => {
  const docRef = doc(db, col, docId);
  await updateDoc(docRef, newData);
};

//Subscription

export const getSubscription = (col, callback) => {
  const collectionRef = collection(db, col);
  const unsubscribe = onSnapshot(collectionRef, callback);
  return unsubscribe;
};

//Delete tweet

export const deleteTweet = async (col, id) => {
  const docRef = doc(db, col, id);
  await deleteDoc(docRef);
};
