import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

//Posteo del tuit a la base de datos

export const postData = async (col, data) => {
    try {
    const docRef = await addDoc(collection(db, col), data);
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
    };

    // export const getData = async (col) => {
    //     const collectionRef = getCollectionRef(col);
    //     const snapData = await getDocs(collectionRef);
    //     return snapData;
    //   };

    //   const postTweet = async () => {
    //   try {
    //   const docRef = await addDoc(collection(db, "tuits"), {
    //       user: userData.displayName,
    //       text: tweet,
    //       time: new Date().getTime()
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //   console.error("Error adding document: ", e);
    //   }
    //   };