import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";

import RootNagivator from "./navigators";
import { Text } from "react-native";

// TODO: Write down the API keys on eas.json and configure proper private keys
// TODO: Add animations using React native reanimated

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
        {/* TODO: Add an Absolute Badge when network is disconnected */}
        {!network && (
          <Text className="absolute z-50 mt-12 bg-red-500/80 font-bold p-2">
            No Internet
          </Text>
        )}
        <RootNagivator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

registerRootComponent(App);
