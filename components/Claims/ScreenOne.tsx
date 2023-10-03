/*
 * Screen 1 - Handling Getting Car Information
 */

import { Input, Stack } from "native-base";
import { useState } from "react";
import { View } from "react-native";

import Footer from "./Footer";
import { auth } from "../../config/firebase";

const ScreenOne = ({ navigation }) => {
  // States
  const [carBrand, setCarBrand] = useState<string>(""); // Holding Car Brand
  const [carModel, setCarModel] = useState<string>(""); // Holding Car Model
  const [licensePlate, setLicensePlate] = useState<string>(""); // Holding License Plate number

  return (
    <View className="flex w-full h-full">
      <View className="basis-10/12 w-full flex justify-center items-center">
        <Stack space={12} w="100%" maxW="300px" mx="auto">
          <Input
            size="lg"
            isReadOnly
            variant="filled"
            value={auth.currentUser.email}
            mx="3"
            placeholder="Input"
            w="80%"
          />
          <Input
            size="lg"
            mx="3"
            placeholder="Car Brand"
            w="80%"
            value={carBrand}
            isRequired
            onChange={(e) => setCarBrand(e.nativeEvent.text)}
          />
          <Input
            size="lg"
            mx="3"
            placeholder="Car Model"
            w="80%"
            value={carModel}
            isRequired
            onChange={(e) => setCarModel(e.nativeEvent.text)}
          />
          <Input
            size="lg"
            mx="3"
            placeholder="License Plate"
            w="80%"
            value={licensePlate}
            isRequired
            autoCapitalize="characters"
            onChange={(e) => setLicensePlate(e.nativeEvent.text)}
          />
        </Stack>
      </View>

      <Footer
        navigation={navigation}
        nextScreen="ScreenTwo"
        content={{ carModel, carBrand, licensePlate }}
        loading={false}
      />
    </View>
  );
};

export default ScreenOne;
