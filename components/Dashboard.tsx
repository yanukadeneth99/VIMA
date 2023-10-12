import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { Button, HStack, Heading, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";

import { auth, db } from "../config/firebase";
import { getClaims, getClaimStatus } from "../functions/Claims";

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
      where("username", "==", auth.currentUser.email)
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
    <View className="p-5 flex justify-between items-center space-y-12 w-full h-full">
      <View>
        <Text className="font-bold text-xl text-center">Welcome!</Text>
        <Text>{auth.currentUser.email}</Text>
      </View>
      {loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="sm">
            Loading Claims...
          </Heading>
        </HStack>
      ) : (
        <View className="pb-12">
          {/* TODO: Create a claim component which handles everything internally including loading for images */}
          <ScrollView className="flex flex-col space-y-12 w-11/12">
            {docs.length > 1 ? (
              docs.map((doc) => {
                return (
                  <View
                    key={doc.id}
                    className="flex flex-col justify-center items-center space-y-2 bg-gray-200 w-full rounded-2xl p-3"
                  >
                    <View className="flex flex-row justify-around items-center w-full">
                      <Text>
                        {doc.get("car_brand")} - {doc.get("car_model")} ||{" "}
                        {doc.get("license_plate")}
                      </Text>
                      <Text>{getClaimStatus(doc.get("status"))}</Text>
                    </View>
                    <ScrollView horizontal>
                      <View className="flex flex-row justify-evenly items-center space-x-3">
                        {doc.get("imageUploads").map((uri) => {
                          return (
                            <Image
                              key={uri}
                              source={{
                                uri,
                              }}
                              className=""
                              height={80}
                              width={80}
                            />
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                );
              })
            ) : (
              <Text>No Claims made</Text>
            )}
          </ScrollView>
          <Button
            variant="outline"
            className="mt-12"
            isLoading={loading}
            isLoadingText="Manual Refreshing"
            onPress={() => callClaims()}
          >
            Manual Refresh
          </Button>
        </View>
      )}
    </View>
  );
};

export default Dashboard;
