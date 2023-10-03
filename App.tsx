import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RootNagivator from "./navigators";

import "./config/firebase";

export default function App() {
  return (
    <SafeAreaView className=" h-full w-full bg-gray-100">
      <NavigationContainer>
        <NativeBaseProvider>
          <RootNagivator />
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
