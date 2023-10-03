import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Button, HStack, Heading, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { auth } from "../config/firebase";
import { getClaims } from "../functions/Claims";

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
          <View className="flex flex-col justify-center items-center space-y-8">
            {docs.length > 1 ? (
              docs.map((doc) => {
                return <Text key={doc.id}>{doc.get("username")}</Text>;
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
