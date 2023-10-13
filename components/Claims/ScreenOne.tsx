/*
 * Screen 1 - Handling Getting Car Information
 */

import { useEffect, useState } from "react";
import { View, TextInput } from "react-native";

import Footer from "./Footer";

const ScreenOne = ({ navigation }) => {
  // States
  const [carBrand, setCarBrand] = useState<string>(""); // Holding Car Brand
  const [carModel, setCarModel] = useState<string>(""); // Holding Car Model
  const [licensePlate, setLicensePlate] = useState<string>(""); // Holding License Plate number
  const [allow, setAllow] = useState<boolean>(false); // Allows submission if the value is true

  useEffect(() => {
    if (!(carBrand === "" || carModel === "" || licensePlate === "")) {
      setAllow(true);
    } else {
      if (allow) setAllow(false);
    }
  }, [carBrand, carModel, licensePlate]);

  return (
    <View className="flex justify-center items-center w-full h-full">
      {/* Top Segment */}
      <View className="basis-10/12 px-8 w-full flex justify-center items-stretch space-y-12">
        <TextInput
          className="border-2 border-blue-500/40 w-full p-1 px-3 rounded-md"
          onChangeText={setCarBrand}
          value={carBrand}
          placeholder="Car Brand"
        />
        <TextInput
          className="border-2 border-blue-500/40 w-full p-1 px-3 rounded-md"
          onChangeText={setCarModel}
          value={carModel}
          placeholder="Car Brand"
        />
        <TextInput
          className="border-2 border-blue-500/40 w-full p-1 px-3 rounded-md"
          onChangeText={setLicensePlate}
          value={licensePlate}
          placeholder="License Plate"
          autoCapitalize="characters"
        />
      </View>

      {/* Footer */}
      <Footer
        loading={!allow}
        navigation={navigation}
        nextScreen="ScreenTwo"
        content={{ carModel, carBrand, licensePlate }}
      />
    </View>
  );
};

export default ScreenOne;
