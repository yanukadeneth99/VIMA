import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CreateClaim from "../components/CreateClaim";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";

const SignedIn = () => {
  // Creating Bottom Tab Navigator
  const Tab = createBottomTabNavigator();

  // Logging all users
  // console.log(user.toJSON());

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        children={() => <Dashboard />}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
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
      <Tab.Screen
        name="Settings"
        children={() => <Settings />}
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
