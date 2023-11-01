/*
 * File handling File Uploads into Firebase Storage
 */

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import PushAlert from "./Alert";
import { storage } from "../config/firebase";

/**
 * Function to get the image as a Blob and Upload to Firebase Storage
 * @param {string} uri - The file URI of the image
 * @returns {Promise<string[]>} - The upload result of the image or null if error
 */
async function uploadImage(uri: string): Promise<string> {
  try {
    console.log("Called uploadImage : ", uri);

    // Create a Reference to Image
    // TODO: Fix this for iOS
    const imageRef = ref(storage, uri.split("/DCIM/")[1]);

    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    await uploadBytes(imageRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error(error);
    PushAlert("Error", "Error uploading image");
    return null;
  }
}

/**
 * Function to delete the image
 * @param {string} uri - The file URI of the image
 */
async function deleteImage(uri: string): Promise<void> {
  try {
    // Creating a Reference for the image
    const imageRef = ref(storage, uri);

    // Delete the files
    await deleteObject(imageRef);
  } catch (error) {
    console.error(error);
    PushAlert("Error", "Error deleting image");
  }
}

export { uploadImage, deleteImage };
