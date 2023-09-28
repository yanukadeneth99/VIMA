/*
 * File to contain the Signin Up of the user, returns a user object or null
 */

import { User, getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

/**
 * Function to Sign up a user with email and password
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {User | null} - The user object or null if the user is not found
 */
export default function signIn(email: string, password: string): User | null {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Created user and return the user
      return userCredential.user;
    })
    .catch((error) => {
      console.error(`${error.code}: ${error.message}`);
    });

  return null;
}
