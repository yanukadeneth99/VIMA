import "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Badge } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RootNagivator from "./navigators";

export default function App() {
  // Handles Network Change
  const [network, setNetwork] = useState<boolean>(true);
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      // Have Internet
      if (network === false) setNetwork(true);
    } else {
      // Don't have Internet
      if (network === true) setNetwork(false);
    }
  });

  return (
    <SafeAreaView className=" h-full w-full bg-gray-100">
      <NavigationContainer>
        <NativeBaseProvider>
          {/* Adds an Absolute Badge when network is disconnected */}
          {!network && (
            <Badge className="absolute z-50" colorScheme="danger">
              No Internet
            </Badge>
          )}
          <RootNagivator />
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
