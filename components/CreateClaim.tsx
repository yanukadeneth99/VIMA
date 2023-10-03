import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ScreenFour from "./Claims/ScreenFour";
import ScreenOne from "./Claims/ScreenOne";
import ScreenThree from "./Claims/ScreenThree";
import ScreenTwo from "./Claims/ScreenTwo";

const Stack = createStackNavigator();

const CreateClaim = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      <Stack.Screen name="ScreenThree" component={ScreenThree} />
      <Stack.Screen name="ScreenFour" component={ScreenFour} />
    </Stack.Navigator>
  );
};

export default CreateClaim;
