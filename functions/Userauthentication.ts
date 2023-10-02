/*
 * File handling the user Authentication
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../config/firebase";

// Function to push an alert to the user
function PushAlert(header: string, footer: string) {
  Alert.alert(`${header}`, `${footer}`, [{ text: "OK" }], {
    cancelable: true,
  });
}

/**
 * Function to Sign in a user with email and password
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {User | null} - The user object or null if the user is not found
 */
async function signIn(email: string, password: string): Promise<void> {
  console.log("Sign In User Authentication Called");
  await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error(`${error.code}: ${error.message}`);
    if (error.code === "auth/invalid-email") {
      PushAlert(
        "Wrong Email or Password",
        "The account you are trying to login does not exist"
      );
      return;
    }
    if (error.code === "auth/invalid-login-credentials") {
      PushAlert(
        "Wrong Email or Password",
        "Please check your email or password and try again"
      );
      return;
    }
    PushAlert(error.code, error.message);
  });
}

/**
 * Function to Sign up a user with email and password
 * @param {string} email - The username of the user
 * @param {string} password - The password of the user
 * @returns {User | null} - The user object or null if the user is not found
 */
async function signUp(email: string, password: string): Promise<void> {
  console.log("Sign Up User Authentication Called");
  await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error(`${error.code}: ${error.message}`);
    if (error.code === "auth/invalid-email") {
      PushAlert("Incorrect Email", "Please enter a valid email");
      return;
    }
    if (error.code === "auth/weak-password") {
      PushAlert(
        "Weak Password",
        "Please make sure your password contains atleast 6 characters"
      );
      return;
    }
    if (error.code === "auth/email-already-in-use") {
      PushAlert("Email Already in Use", "Please login instead");
      return;
    }
    PushAlert(error.code, error.message);
  });
}

export { signIn, signUp };
