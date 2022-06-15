import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD1YLr81xONcMFoIgHSe7mhRTOjE9ng0z0",
    authDomain: "crwn-clothing-db-9ed30.firebaseapp.com",
    projectId: "crwn-clothing-db-9ed30",
    storageBucket: "crwn-clothing-db-9ed30.appspot.com",
    messagingSenderId: "438094255832",
    appId: "1:438094255832:web:61bc43d995847c45a1e9ad"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef)


  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

}