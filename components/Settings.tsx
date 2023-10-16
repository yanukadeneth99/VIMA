/*
 * This page handles the settings page of UI after the user logs in. Settings contains configs on User, Claims, Saving data about cars, Log out, etc
 */

import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { logOut } from "../functions/Userauthentication";

const Settings = () => {
  // States
  const [loading, setLoading] = useState<boolean>(false); // Holds whether the application is loading or not to trigger a loading element when necessary

  // Function that handles the log out
  async function runLogOut() {
    setLoading(true);
    await logOut().then(() => {
      setLoading(false);
    });
  }

  return (
    <View className="w-full h-full flex justify-center items-center">
      {loading ? (
        <View className="flex justify-center items-center w-full h-full">
          <Text className="text-center font-bold text-gray-800">
            Loading...
          </Text>
        </View>
      ) : (
        <View className="w-full h-full flex justify-evenly items-center">
          <Pressable className="bg-blue-500 p-5 rounded shadow w-3/4">
            <Text className="text-white uppercase font-bold text-center">
              Option A
            </Text>
          </Pressable>
          <Pressable className="bg-blue-500 p-5 rounded shadow w-3/4">
            <Text className="text-white uppercase font-bold text-center">
              Option B
            </Text>
          </Pressable>
          <Pressable className="bg-blue-500 p-5 rounded shadow w-3/4">
            <Text className="text-white uppercase font-bold text-center">
              Option C
            </Text>
          </Pressable>
          <Pressable className="bg-blue-500 p-5 rounded shadow w-3/4">
            <Text className="text-white uppercase font-bold text-center">
              Option D
            </Text>
          </Pressable>
          <Pressable
            onPress={() => runLogOut()}
            className="bg-blue-200/20 border-4 border-red-500/50 p-5 rounded shadow w-3/4"
          >
            <Text className="text-gray-800 uppercase font-bold text-center">
              Log Out
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Settings;
