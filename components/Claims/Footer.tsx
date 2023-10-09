import { Button } from "native-base";
import React from "react";
import { View } from "react-native";

import { FooterProps } from "../../interfaces/FooterProp";

const Footer = ({ navigation, nextScreen, content, loading }: FooterProps) => {
  return (
    <View className="flex basis-2/12 w-full">
      <View className="flex-row justify-around items-center">
        {nextScreen === "ScreenTwo" ? (
          <Button
            colorScheme="secondary"
            isDisabled={loading ?? false}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "ScreenOne" }],
              })
            }
          >
            Reset
          </Button>
        ) : (
          <Button
            colorScheme="secondary"
            isDisabled={loading ?? false}
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
        )}

        <Button
          isDisabled={loading ?? false}
          onPress={() => navigation.navigate(nextScreen, content)}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Footer;
