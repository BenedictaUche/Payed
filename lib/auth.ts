import { useToast } from '@/hooks/use-toast'
import { auth, db } from './firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import Confirm from '@/components/Confirm'


export async function signIn(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error setting persistence:", error);
    throw error;
  }
}

export async function signUp(email: string, password: string, name: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Create user profile in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    name,
    authProvider: "local",
    uid: user.uid,
    createdAt: new Date().toISOString(),
  })

  return userCredential
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  const user = userCredential.user

  // Create/update user profile in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    uid: user.uid,
    email: userCredential.user.email,
    name: userCredential.user.displayName,
    authProvider: "google",
    updatedAt: new Date().toISOString(),
  }, { merge: true })

  return userCredential
}

export async function signOut(router: any) {
  const confirmed = await confirm("Are you sure you want to log out?");
  if (!confirmed) return;

  try {
    await firebaseSignOut(auth);
    router.push("/login");
  } catch (err) {
    console.error("Error signing out:", err);
    alert("An error occurred while signing out. Please try again.");
  }
}

// export async function resetPassword(email: string) {
//   const {toast} = useToast()
//   const resetPassword = await sendPasswordResetEmail(auth, email);
//   try {
//    resetPassword
//     toast({
//       variant: 'default',
//       title: 'Password reset link sent!',
//     });
//   } catch (err: any) {
//     toast({
//       variant: 'destructive',
//       title: (err.message)
//     })
//   }
//   return resetPassword
// }

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
