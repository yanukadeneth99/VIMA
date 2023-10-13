/*
 * Footer of the Create Claims Stack of UI Elements
 */

import React from "react";
import { Pressable, View, Text } from "react-native";

import { FooterProps } from "../../interfaces/FooterProp";

const Footer = ({ navigation, nextScreen, content, loading }: FooterProps) => {
  return (
    <View className="flex flex-row basis-2/12 w-full justify-evenly items-center">
      {/* Back - If we're in screenOne, display Reset instead of Back and Reset the Stack */}
      {nextScreen === "ScreenTwo" ? (
        <Pressable
          className="bg-red-300/30 border-2 border-red-500/50 p-3 rounded-md"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "ScreenOne" }],
            })
          }
        >
          <Text className="text-gray-800 font-bold uppercase">Reset</Text>
        </Pressable>
      ) : (
        <Pressable
          className="bg-blue-500 p-3 rounded-md"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold uppercase">Back</Text>
        </Pressable>
      )}

      <Pressable
        className={`p-3 rounded-md ${loading ? "bg-gray-300" : "bg-blue-500"}`}
        disabled={loading ?? false}
        onPress={() => navigation.navigate(nextScreen, content)}
      >
        <Text className="text-white font-bold uppercase">Next</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
