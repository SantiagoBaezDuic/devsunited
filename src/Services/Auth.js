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

export const signOut = async () => {
  await _signOut(auth).catch((error) => console.error(error));
};

export const handleAuthChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

export const addUserToFirestore = async (user) => {
  const { uid, displayName, email, photoURL } = user;
  const userExists = await getDataByID("userData", uid);
  if (userExists === undefined) {
    await setDocument("userData", uid, {
      name: displayName,
      email: email,
      photo: photoURL,
      likedTweets: [],
    });
  } else {
    return userExists;
  }
};
