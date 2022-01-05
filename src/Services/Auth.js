import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signOut as _signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getDataByID, setDocument } from "./operations";

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    return userCredentials;
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = () => {
  _signOut(auth);
};

export const handleAuthChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

/////////////////////////////////////////////////////////

export const addUserToFirestore = async (user) => {
  const { id, displayName, email, photoURL } = user;
  const userExists = await getDataByID("userData", id);
  if (!userExists) {
    await setDocument("userData", id, {
      name: displayName,
      email: email,
      photo: photoURL,
    });
  }
};

/////////////////////////////////////////////////////////
