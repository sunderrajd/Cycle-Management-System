import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { createUser, getUser } from './firestore'
import { app } from './index'

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export async function signUp(email: string, password: string): Promise<true | { code: string }> {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    return true
  } catch (error) {
    return error as { code: string }
  }
}
export async function signIn(email: string, password: string): Promise<true | { code: string }> {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return true
  } catch (error) {
    return error as { code: string }
  }
}

export async function signInGoogle(): Promise<true | { code: string }> {
  try {
    const response = await signInWithPopup(auth, provider)
    const email = response.user.email
    if (!email?.endsWith('@iiitl.ac.in')) {
      signOut(auth)
      alert('Please use college email!')
      return { code: 'error' }
    }
    const data = await getUser(email || '')
    if (!data) {
      await createUser(
        email || '',
        response.user.displayName || '',
        response.user.photoURL || undefined
      )
    }
    return true
  } catch (error) {
    return error as { code: string }
  }
}
export async function logOut() {
  return await signOut(auth)
}
