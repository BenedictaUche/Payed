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

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signUp(email: string, password: string, name: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // Create user profile in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    name,
    createdAt: new Date().toISOString(),
  })

  return userCredential
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)

  // Create/update user profile in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email: userCredential.user.email,
    name: userCredential.user.displayName,
    updatedAt: new Date().toISOString(),
  }, { merge: true })

  return userCredential
}

export async function signOut() {
  return firebaseSignOut(auth)
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}
