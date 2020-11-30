import firebase from 'firebase/app';
/* Importing below 2 will auto-attach to firebase object above. */
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDYhVAHZ8FoK8MTdRIsSsW-bdZMB6P3kis',
  authDomain: 'crwn-clothing-1db4c.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-1db4c.firebaseio.com',
  projectId: 'crwn-clothing-1db4c',
  storageBucket: 'crwn-clothing-1db4c.appspot.com',
  messagingSenderId: '341465390861',
  appId: '1:341465390861:web:77db4ad61a9f52eabeda44',
  measurementId: 'G-2PNPXDCR7Q',
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        /* We expect to receive "additionalData" as an object. Then here we desctructure the key value pairs. */
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user doc', error.message);
    }
  }
  // We can't return snapshot because we at this stage not sure if the snapshot will be null.
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* We create a provider with Google auth-sign-in service. We have to option to select Git, FB or Twitter & so on. */
const provider = new firebase.auth.GoogleAuthProvider();

/* This will give options for user to select their existing signed-in accounts or create a new account. */
provider.setCustomParameters({ prompt: 'select_account' });

/* This will create a popup for user to sign in/up with our specified 'provider' which is Google. We can use 'signInWithRedirect' if we want open new tab instead. */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
