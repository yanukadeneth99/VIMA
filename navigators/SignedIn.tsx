/*
 * This page handles what gets shown to the user when the user is logged in
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

import { getNumPendingClaims } from "../functions/Claims";

// Three main tabs
import CreateClaim from "../components/CreateClaim";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const SignedIn = () => {
  // State
  const [numPendingClaims, setNumPendingClaims] = useState<number>(0); // Hold the number of pending claims made by the user

  // Run the `getNumPendingClaims` asyc when the page loads
  useEffect(() => {
    async function runClaims() {
      console.log("Running Getting Claims");
      getNumPendingClaims().then((num: number) => {
        setNumPendingClaims(num);
      });
    }
    runClaims().then(() => {
      console.log(numPendingClaims);
    });
  }, []);

  // Creating Bottom Tab Navigator
  const Tab = createBottomTabNavigator();

  // Setting up a snapshot for realtime database updates
  // TODO: Update this and think about what I want to show for badges
  useEffect(() => {
    const q = query(
      collection(db, "Claims"),
      where("username", "==", auth.currentUser.email),
      where("status", "==", 1)
    );
    const unsubscribeSnapshot = onSnapshot(
      q,
      { includeMetadataChanges: false },
      (querySnapshot) => {
        const docs: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc);
        });
        setNumPendingClaims(docs.length);
      },
      (error) => {
        console.log("Error getting pending documents: ", error);
      }
    );
    // Unsubscribe when the component unmounts to prevent memory leaks
    return () => unsubscribeSnapshot();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarBadge: numPendingClaims,
        }}
      />

      {/* Create Claims */}
      <Tab.Screen
        name="Create"
        component={CreateClaim}
        options={{
          tabBarLabel: "Create Claims",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Settings */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SignedIn;
