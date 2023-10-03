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
 * @param {string} carBrand - The brand of the car
 * @param {string} carModel - The model of the car
 * @param {string} licensePlate - The license Plate of the car
 * @param {{longitude: number, latitude: number}} location - The location of the incident
 */
async function createDoc(
  carBrand: string,
  carModel: string,
  licensePlate: string,
  location: { longitude: number; latitude: number }
): Promise<void> {
  try {
    // TODO : Take in photos and Geo location and handle them
    const docRef = await addDoc(collection(db, "Claims"), {
      username: auth.currentUser.email,
      car_brand: carBrand,
      car_model: carModel,
      license_plate: licensePlate,
      location,
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
