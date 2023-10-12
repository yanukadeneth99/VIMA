/*
 * This page handles what gets shown to the user when the user is logged in
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Three main tabs
import CreateClaim from "../components/CreateClaim";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";

const SignedIn = () => {
  // Creating Bottom Tab Navigator
  const Tab = createBottomTabNavigator();

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
          tabBarBadge: 3,
        }}
      />

      {/* Create Claims */}
      {/* <Tab.Screen
        name="Create"
        component={CreateClaim}
        options={{
          tabBarLabel: "Create Claims",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      /> */}

      {/* Settings */}
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default SignedIn;
