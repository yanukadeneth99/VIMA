import { Button } from "native-base";
import React from "react";
import { View } from "react-native";

interface LogoutUser {
  LogoutUser: () => void;
}

const Settings = ({ LogoutUser }: LogoutUser) => {
  return (
    <View className="w-full h-full flex justify-center items-center space-y-12">
      <Button className="w-2/3">Option A</Button>
      <Button className="w-2/3">Option B</Button>
      <Button className="w-2/3">Option C</Button>
      <Button className="w-2/3">Option D</Button>
      <Button
        onPress={() => LogoutUser()}
        className="w-2/3"
        variant="outline"
        colorScheme="secondary"
      >
        Log out
      </Button>
    </View>
  );
};

export default Settings;
