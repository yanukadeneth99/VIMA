/*
 * File handling the `Claims` datastore
 */

import * as MediaLibrary from "expo-media-library";
import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  QuerySnapshot,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";

import PushAlert from "./Alert";
import * as Network from "expo-network";
import { uploadImage } from "./FileUpload";
import { db, auth } from "../config/firebase";

/**
 * Function to create a new document in the `Claims` datastore
 * @param {string} carBrand - The brand of the car
 * @param {string} carModel - The model of the car
 * @param {string} licensePlate - The license Plate of the car
 * @param {{longitude: number, latitude: number}} location - The location of the incident
 * @param {MediaLibrary.Asset[]} images - The photos you want to upload
 */
async function createDoc(
  carBrand: string,
  carModel: string,
  licensePlate: string,
  location: { longitude: number; latitude: number },
  images: MediaLibrary.Asset[]
): Promise<boolean> {
  try {
    // Check if the user is connected to the internet and throw an error if there is no internet
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected === false) {
      console.error("Internet is not connected");
      PushAlert("ERROR", "No Internet Connection");
      return false;
    }

    // Upload the images
    const imageUploads = [] as string[];
    for (const image of images) {
      console.log("Uploading image: ", image.uri);
      const uploadResult = await uploadImage(image.uri);
      if (uploadResult === null) throw new Error("Error uploading image");
      imageUploads.push(uploadResult);
    }

    // Add a claim document to firestore
    const docRef = await addDoc(collection(db, "Claims"), {
      username: auth.currentUser.email,
      car_brand: carBrand,
      car_model: carModel,
      license_plate: licensePlate,
      location,
      imageUploads,
      status: 1,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log("Document written with ID: ", docRef.id);
    PushAlert("Success", "Your claim has been submitted");
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    PushAlert("Error", `${error.code}: ${error.message}`);
    return false;
  }
}

/**
 * Function to retreive all the documents in the `Claims` datastore
 * @returns {Promise<QuerySnapshot<DocumentData, DocumentData>>} - The query snapshot of the `Claims` datastore
 */
async function getClaims(): Promise<QuerySnapshot<DocumentData, DocumentData>> {
  try {
    console.log("Getting Claims for: ", auth.currentUser.email);
    const docCollection = collection(db, "Claims");
    const queryCollection = query(
      docCollection,
      where("username", "==", auth.currentUser.email),
      orderBy("createdAt", "desc")
    );
    //! Make sure to update the `onSnapShot` in Dashboard as that's what's being used to update the UI
    return await getDocs(queryCollection);
  } catch (error) {
    console.error(error.code, error.message);
    PushAlert("Error Fetching Claims", `${error.code}: ${error.message}`);
  }
}

/**
 * Function to retreive the number of pending documents in the `Claims` datastore
 * @returns {Promise<number>} - The query snapshot of the `Claims` datastore
 */
async function getNumPendingClaims(): Promise<number> {
  try {
    console.log(
      "Getting Number of Pending Claims for: ",
      auth.currentUser.email
    );
    const docCollection = collection(db, "Claims");
    const queryCollection = query(
      docCollection,
      where("username", "==", auth.currentUser.email),
      where("status", "==", 1)
    );
    return (await getDocs(queryCollection)).size;
  } catch (error) {
    console.error(error.code, error.message);
    PushAlert("Error Fetching Claims", `${error.code}: ${error.message}`);
  }
}

/**
 * Function to get the status when passed the status number
 * @param {number} num - The status number
 * @returns {string} - The status text
 */
function getClaimStatus(num: number): string {
  switch (num) {
    case 0:
      return "To Upload";
    case 1:
      return "Pending";
    case 2:
      return "Approved";
    case 3:
      return "Rejected";
    default:
      return "Unknown";
  }
}

export { createDoc, getClaims, getClaimStatus, getNumPendingClaims };
