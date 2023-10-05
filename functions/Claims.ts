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
} from "firebase/firestore";

import PushAlert from "./Alert";
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
): Promise<void> {
  try {
    // TODO : Take in photos and Geo location and handle them

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
    // TODO: Getting all Collections, change later
    return await getDocs(docCollection);
  } catch (error) {
    console.error(error.code, error.message);
    PushAlert("Error Fetching Claims", `${error.code}: ${error.message}`);
  }
}

export { createDoc, getClaims };
