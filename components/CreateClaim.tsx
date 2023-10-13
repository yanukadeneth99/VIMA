import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ScreenOne from "./Claims/ScreenOne";
import ScreenTwo from "./Claims/ScreenTwo";
// import ScreenThree from "./Claims/ScreenThree";
// import ScreenFour from "./Claims/ScreenFour";

const Stack = createStackNavigator();

const CreateClaim = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      {/* <Stack.Screen name="ScreenThree" component={ScreenThree} /> */}
      {/* <Stack.Screen name="ScreenFour" component={ScreenFour} /> */}
    </Stack.Navigator>
  );
};

export default CreateClaim;
