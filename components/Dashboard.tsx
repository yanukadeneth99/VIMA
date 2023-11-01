/*
 * This is the main page the user sees when logged in. Dashboard contains all the claims and show what state they are
 */

import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { auth, db } from "../config/firebase";
import { getClaims } from "../functions/Claims";
import Claim from "./Claims/Claim";

const Dashboard = () => {
  // States
  const [docs, setDocs] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // State for the documents
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  // Async Function handling the call to getClaims when the page loads
  async function callClaims() {
    setLoading(true);
    await getClaims().then(
      (data: QuerySnapshot<DocumentData, DocumentData>) => {
        setDocs(data.docs);
        setLoading(false);
      }
    );
  }

  // Setting up a snapshot for realtime database updates
  useEffect(() => {
    const q = query(
      collection(db, "Claims"),
      where("username", "==", auth.currentUser.email),
      orderBy("createdAt", "desc")
    );
    const unsubscribeSnapshot = onSnapshot(
      q,
      { includeMetadataChanges: false },
      (querySnapshot) => {
        setLoading(true);
        const docs: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
        querySnapshot.forEach((doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          docs.push(doc);
          console.log("Updated document: ", doc.get("car_brand"), source);
        });
        console.log("Called onSnapshot");
        setDocs(docs);
        setLoading(false);
      },
      (error) => {
        console.log("Error getting documents: ", error);
      }
    );
    // Unsubscribe when the component unmounts to prevent memory leaks
    return () => unsubscribeSnapshot();
  }, []);

  return (
    <View className="flex justify-between items-center w-full h-full">
      {/* Header */}
      <View className="w-full flex basis-1/12 justify-center items-center">
        <Text className="font-bold text-xl text-center">Welcome!</Text>
        <Text>{auth.currentUser.email}</Text>
      </View>
      {loading ? (
        <View className="flex justify-center items-center w-full basis-10/12">
          <Text className="text-center font-bold text-gray-800">
            Loading...
          </Text>
        </View>
      ) : (
        <>
          {/* Body */}
          <View className="pb-12 basis-10/12 p-5">
            <ScrollView
              className="flex flex-col space-y-2 w-11/12 "
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {docs.length > 0 ? (
                docs.map((doc) => {
                  return (
                    <View
                      key={doc.id}
                      className="flex flex-col justify-center items-center space-y-2 bg-blue-500/30 w-full rounded-2xl p-3 shadow-md"
                    >
                      <Claim
                        id={doc.id}
                        key={doc.id}
                        licensePlate={doc.get("license_plate")}
                        status={doc.get("status")}
                        images={doc.get("imageUploads")}
                        createdAt={doc.get("createdAt")}
                      />
                    </View>
                  );
                })
              ) : (
                <Text className="text-gray-600 font-bold uppercase">
                  No Claims made
                </Text>
              )}
            </ScrollView>
          </View>
          <View className="basis-1/12 w-full px-5 flex justify-center items-end">
            <Pressable
              className="p-2 border-2 bg-blue-100/20 border-blue-500/70 rounded-md shadow-md"
              disabled={loading}
              onPress={() => callClaims()}
            >
              <Text className="text-center text-gray-700">
                <Ionicons name="refresh" size={20} color="black" />
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default Dashboard;
