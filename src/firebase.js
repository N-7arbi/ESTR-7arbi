import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,} from "firebase/auth";
import {  getFirestore, query, getDocs,collection, where,addDoc,} from "firebase/firestore";


const firebaseConfig = {
apiKey: "AIzaSyBW8nl4EiG4ibZSA91T5QNeQtstXaRerZM",
authDomain: "estr-b9274.firebaseapp.com",
projectId: "estr-b9274",
storageBucket: "estr-b9274.appspot.com",
messagingSenderId: "1066868143625",
appId: "1:1066868143625:web:996a875390979de3622ad8",
measurementId: "G-T0PHS24V2X"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);





const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) { console.error(err) }
};
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {console.error(err)}
};


export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};



export const logout = () => { signOut(auth) }