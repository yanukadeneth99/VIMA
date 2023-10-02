/*
 * File handling the user Authentication
 */

import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../config/firebase";

// Function to push an alert to the user
function PushAlert(header: string, footer: string) {
  Alert.alert(
    `${header}`,
    `${footer}`,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    {
      cancelable: true,
    }
  );
}

/**
 * Function to Sign in a user with email and password
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {User | null} - The user object or null if the user is not found
 */
async function signIn(email: string, password: string): Promise<User | null> {
  console.log("Sign In User Authentication Called");
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in and return the user
      return userCredential.user;
    })
    .catch((error) => {
      console.error(`${error.code}: ${error.message}`);
      if (error.code === "auth/invalid-email") {
        PushAlert(
          "Wrong Email or Password",
          `${error.code} : ${error.message}`
        );
        return;
      }
      if (error.code === "auth/invalid-login-credentials") {
        PushAlert(
          "Wrong Email or Password",
          `${error.code} : ${error.message}`
        );
        return;
      }
      PushAlert(error.code, error.message);
    });

  return null;
}

/**
 * Function to Sign up a user with email and password
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {User | null} - The user object or null if the user is not found
 */
async function signUp(email: string, password: string): Promise<User | null> {
  console.log("Sign Up User Authentication Called");
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created");
      // Created user and return the user
      return userCredential.user;
    })
    .catch((error) => {
      console.error(`${error.code}: ${error.message}`);
      if (error.code === "auth/invalid-email") {
        PushAlert("Incorrect Email", `${error.code} : ${error.message}`);
        return;
      }
      if (error.code === "auth/weak-password") {
        PushAlert("Weak Password", `${error.code} : ${error.message}`);
        return;
      }
      PushAlert(error.code, error.message);
    });

  return null;
}

export { signIn, signUp };
