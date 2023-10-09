/*
 * Screen 1 - Handling Getting Car Information
 */

import { Input, Stack } from "native-base";
import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import Footer from "./Footer";
import { auth } from "../../config/firebase";

const ScreenOne = ({ navigation }) => {
  // States
  const [carBrand, setCarBrand] = useState<string>(""); // Holding Car Brand
  const [carModel, setCarModel] = useState<string>(""); // Holding Car Model
  const [licensePlate, setLicensePlate] = useState<string>(""); // Holding License Plate number
  const [allow, setAllow] = useState<boolean>(false); // Allows submission if the value is true

  // Styles for the input buttons
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  useEffect(() => {
    if (!(carBrand === "" || carModel === "" || licensePlate === "")) {
      setAllow(true);
    }
  }, [carBrand, carModel, licensePlate]);

  // TODO: Disable the button when the texts are null
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
          <TextInput
            style={styles.input}
            onChangeText={setCarBrand}
            value={carBrand}
            placeholder="Car Brand"
          />
          <TextInput
            style={styles.input}
            onChangeText={setCarModel}
            value={carModel}
            placeholder="Car Brand"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLicensePlate}
            value={licensePlate}
            placeholder="License Plate"
            autoCapitalize="characters"
          />
        </Stack>
      </View>

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
