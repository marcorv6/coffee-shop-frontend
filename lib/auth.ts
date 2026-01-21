"use client";

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";

// Sign in with email and password
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { user: null, error: getErrorMessage(authError.code) };
  }
}

// Sign out
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { error: getErrorMessage(authError.code) };
  }
}

// Send password reset email
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    const authError = error as AuthError;
    return { error: getErrorMessage(authError.code) };
  }
}

// Subscribe to auth state changes
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Error message translations (Spanish)
function getErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    "auth/invalid-email": "El correo electrónico no es válido",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada",
    "auth/user-not-found": "No existe una cuenta con este correo",
    "auth/wrong-password": "La contraseña es incorrecta",
    "auth/invalid-credential": "Credenciales inválidas. Verifica tu correo y contraseña",
    "auth/too-many-requests": "Demasiados intentos fallidos. Intenta más tarde",
    "auth/network-request-failed": "Error de conexión. Verifica tu internet",
    "auth/email-already-in-use": "Este correo ya está registrado",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
    "auth/operation-not-allowed": "Operación no permitida",
    "auth/missing-password": "Ingresa una contraseña",
    "auth/missing-email": "Ingresa un correo electrónico",
  };

  return errorMessages[code] || "Ocurrió un error. Intenta de nuevo";
}
