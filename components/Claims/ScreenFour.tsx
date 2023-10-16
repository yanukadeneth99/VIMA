/*
 * Screen 4 - Handling Submission
 */

import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";

import { createDoc } from "../../functions/Claims";
import { FooterObj } from "../../interfaces/FooterProp";

const ScreenFour = ({ route, navigation }) => {
  // Get the passed information
  const { carBrand, carModel, licensePlate, location, photos }: FooterObj =
    route.params;

  // State
  const [loading, setLoading] = useState<boolean>(false); // Holds the loading state
  const [allow, setAllow] = useState<boolean>(false); // Allows submission if the value is true

  // Handling Submission Button Disabling if one of the fields are null
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
    } else {
      setAllow(false);
    }
  }, []);

  // Submitting the claim and resetting the UI Stack
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
      navigation.reset({
        index: 0,
        routes: [{ name: "ScreenOne" }],
      });
    });
  }

  return (
    <View className="flex w-full h-full">
      {/* Top Segment */}
      <View className="flex flex-col basis-10/12 justify-center items-center space-y-5">
        <Text className="font-bold text-center text-gray-800 uppercase">
          Car Brand : {carBrand}
        </Text>
        <Text className="font-bold text-center text-gray-800 uppercase">
          Car Model : {carModel}
        </Text>
        <Text className="font-bold text-center text-gray-800 uppercase">
          License : {licensePlate}
        </Text>
        <Text className="font-bold text-center text-gray-800 uppercase">
          Longitude : {location.coords.longitude}
        </Text>
        <Text className="font-bold text-center text-gray-800 uppercase">
          Latitude : {location.coords.latitude}
        </Text>
        <View className="h-1/4 w-full p-3 flex justify-center items-center">
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            className="flex flex-row space-x-2"
          >
            {photos.map((photo) => {
              return (
                <Image source={photo} key={photo.uri} className="w-20 h-20" />
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Footer Buttons */}
      <View className="flex flex-row basis-2/12 w-full justify-evenly items-center">
        {/* Back Button */}
        <Pressable
          disabled={loading}
          className={`p-3 px-5 rounded shadow ${
            !allow || loading ? "bg-gray-300" : "bg-blue-500"
          }`}
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white uppercase font-bold">Back</Text>
        </Pressable>

        {/* Submit Button */}
        <Pressable
          className={`p-3 px-5 rounded shadow ${
            !allow || loading ? "bg-gray-300" : "bg-red-500"
          }`}
          disabled={!allow || loading}
          onPress={() => submitClaim()}
        >
          <Text className="font-bold text-white text-center uppercase">
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ScreenFour;
