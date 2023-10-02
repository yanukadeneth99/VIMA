import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RootNagivator from "./navigators";

import "./config/firebase";

export default function App() {
  return (
    <SafeAreaView className=" h-full w-full bg-gray-100">
      <NativeBaseProvider>
        <RootNagivator />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
