import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  PhoneAuthProvider,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from './firebase';

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithPhone = async (verificationId: string, code: string) => {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  return signInWithCredential(auth, credential);
};

export const logout = () => signOut(auth);

export const mapAuthUser = (user: User | null) => {
  if (!user) return null;
  return {
    id: user.uid,
    name: user.displayName || 'Invitado',
    email: user.email || undefined,
    phone: user.phoneNumber || undefined,
    photoURL: user.photoURL || undefined,
  };
};
