import { authFirebase, firestore } from './config/firebase'
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

type CallbackFunction = (params: any, error?: any) => void

export class AuthFirebase {
  static googleAuth() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authFirebase, provider)
      .then(async result => {
        const docRef = doc(firestore, 'users', result.user.uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          const data = {
            isAdm: false,
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
          }
          await setDoc(docRef, data)
        }
        return result
      })
      .catch(error => {
        // Handle error.
        return error
      })
  }

  static async onUserSession(
    callback: CallbackFunction,    
  ) {    
    onAuthStateChanged(authFirebase, firebaseUser => {
      const user = firebaseUser?.email
        ? {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
            email: firebaseUser.email,
          }
        : undefined
      callback(user)
   })
  }

  static async getCurrentUser() {
    return authFirebase.currentUser
  }

  static async logout() {
    return signOut(authFirebase)
  }
}
