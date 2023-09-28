import React from "react";
import { SafeAreaView } from "react-native";

import RootNagivator from "./navigators";

import "./config/firebase";

export default function App() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <RootNagivator />
    </SafeAreaView>
  );
}
