/*
 * Screen 2 - Handling Camera and getting Photos
 */

import { Text, View } from "react-native";

import Footer from "./Footer";

// TODO : Add Camera Features
const ScreenTwo = ({ route, navigation }) => {
  const { carBrand, carModel, licensePlate } = route.params;
  return (
    <View className="w-full h-full">
      <View className="flex basis-10/12 justify-center items-center space-y-5">
        <Text>Car Brand : {carBrand}</Text>
        <Text>Car Model : {carModel}</Text>
        <Text>License Plate : {licensePlate}</Text>
        <Text>SPACE TO ADD CAMERA</Text>
      </View>
      <Footer
        navigation={navigation}
        nextScreen="ScreenThree"
        content={{ carBrand, carModel, licensePlate }}
        loading={false}
      />
    </View>
  );
};

export default ScreenTwo;
