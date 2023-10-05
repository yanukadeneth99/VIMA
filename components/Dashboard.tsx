import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Button, HStack, Heading, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { auth } from "../config/firebase";
import { getClaims, getClaimStatus } from "../functions/Claims";

const Dashboard = () => {
  const [docs, setDocs] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]); // State for the documents
  const [loading, setLoading] = useState<boolean>(false); // State for loading

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

  useEffect(() => {
    callClaims();
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
        <>
          <View className="flex flex-col justify-center items-center space-y-12 w-11/12">
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
                  </View>
                );
              })
            ) : (
              <Text>No Claims made</Text>
            )}
          </View>
        </>
      )}
      <Button isLoading={loading} onPress={() => callClaims()}>
        Refresh
      </Button>
    </View>
  );
};

export default Dashboard;
