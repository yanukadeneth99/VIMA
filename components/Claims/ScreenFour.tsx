/*
 * Screen 4 - Handling Submission
 */

import { Button } from "native-base";
import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";

import { createDoc } from "../../functions/Claims";
import { FooterObj } from "../../interfaces/FooterProp";

const ScreenFour = ({ route, navigation }) => {
  // Get the passed information
  const { carBrand, carModel, licensePlate, location, photos }: FooterObj =
    route.params;

  // State
  const [loading, setLoading] = useState<boolean>(false); // Holds the loading state
  const [allow, setAllow] = useState<boolean>(false); // Allows submission if the value is true

  useEffect(() => {
    if (
      !(
        carBrand === "" ||
        carModel === "" ||
        licensePlate === "" ||
        location == null ||
        photos == null
      )
    ) {
      setAllow(true);
    }
  }, []);

  async function submitClaim() {
    setLoading(true);
    await createDoc(
      carBrand,
      carModel,
      licensePlate,
      {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
      photos
    ).then(() => {
      setLoading(false);
      // TODO : Fix this. Should redirect to Home and Clear off every data on the create claims form
      // navigation.replace("Home");
    });
  }

  return (
    <View className="flex w-full h-full">
      <View className="flex basis-10/12 justify-center items-center space-y-12">
        <Text>Car Brand : {carBrand}</Text>
        <Text>Car Model : {carModel}</Text>
        <Text>License : {licensePlate}</Text>
        <Text>Longitude : {location.coords.longitude}</Text>
        <Text>Latitude : {location.coords.latitude}</Text>
        <View className="flex flex-row justify-center items-center space-x-2">
          {photos.map((photo) => {
            return (
              <Image source={photo} key={photo.uri} className="w-20 h-20" />
            );
          })}
        </View>
      </View>

      <View className="flex basis-2/12 w-full">
        <View className="flex flex-row justify-evenly items-center">
          <Button
            isLoading={loading}
            colorScheme="secondary"
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
          <Button
            isDisabled={!allow}
            isLoading={loading}
            isLoadingText="Submitting"
            onPress={() => submitClaim()}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ScreenFour;
