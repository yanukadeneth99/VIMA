import { User } from "firebase/auth";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { auth } from "../config/firebase";
import { getClaims } from "../functions/Claims";

const Dashboard = () => {
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

  useEffect(() => {
    callClaims();
  }, []);

  return (
    <View className="p-5 flex justify-start items-center space-y-12 w-full h-full">
      {loading ? (
        <Text>Loading Claims...</Text>
      ) : (
        <>
          <View>
            <Text className="font-bold text-xl text-center">Welcome!</Text>
            <Text>{auth.currentUser.email}</Text>
          </View>

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
    </View>
  );
};

export default Dashboard;
