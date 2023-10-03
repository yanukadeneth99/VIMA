/*
 * File handling the `Claims` datastore
 */

import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  QuerySnapshot,
  query,
  where,
} from "firebase/firestore";

import PushAlert from "./Alert";
import { db, auth } from "../config/firebase";

/**
 * Function to create a new document in the `Claims` datastore
 * @param {string} email - The username of the user doing the action
 * @param {string} car_brand - The brand of the car
 * @param {string} car_model - The model of the car
 */
async function createDoc(
  username: string,
  car_brand: string,
  car_model: string
): Promise<void> {
  try {
    // TODO : Take in photos and Geo location and handle them
    const docRef = await addDoc(collection(db, "claims"), {
      username,
      car_brand,
      car_model,
    });
    console.log("Document written with ID: ", docRef.id);
    PushAlert("Success", "Your claim has been submitted");
  } catch (error) {
    console.error("Error adding document: ", error);
    PushAlert("Error", `${error.code}: ${error.message}`);
  }
}

/**
 * Function to retreive all the documents in the `Claims` datastore
 * @returns {QuerySnapshot<DocumentData, DocumentData>} - The query snapshot of the `Claims` datastore
 */
async function getClaims(): Promise<QuerySnapshot<DocumentData, DocumentData>> {
  try {
    console.log(auth.currentUser.email);
    const docCollection = collection(db, "Claims");
    const queryCollection = query(
      docCollection,
      where("username", "==", auth.currentUser.email)
    );
    return await getDocs(queryCollection);
  } catch (error) {
    console.error(error.code, error.message);
    PushAlert("Error Fetching Claims", `${error.code}: ${error.message}`);
  }
}

export { createDoc, getClaims };
