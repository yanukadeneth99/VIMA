import { Button } from "native-base";
import React from "react";
import { View } from "react-native";

import { FooterProps } from "../../interfaces/FooterProp";

const Footer = ({ navigation, nextScreen, content, loading }: FooterProps) => {
  return (
    <View className="flex basis-2/12 w-full">
      <View className="flex-row justify-around items-center">
        <Button
          colorScheme="secondary"
          disabled={loading ?? false}
          onPress={() => navigation.goBack()}
        >
          {nextScreen === "ScreenTwo" ? "Close" : "Back"}
        </Button>
        <Button
          disabled={loading ?? false}
          onPress={() => navigation.navigate(nextScreen, content)}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Footer;
