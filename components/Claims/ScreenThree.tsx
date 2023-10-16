/*
 * Screen 3 - Handling GeoLocation
 */

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import Footer from "./Footer";
import PushAlert from "../../functions/Alert";

const ScreenThree = ({ route, navigation }) => {
  const { carBrand, carModel, licensePlate, photos } = route.params;

  // States
  const [location, setLocation] = useState<Location.LocationObject | null>(); // Holds the current location
  const [loading, setLoading] = useState<boolean>(true); // Not letting the user proceed until the location is captured

  // Get Location permissions
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        PushAlert(
          "Error Location",
          "Please provide the app location permissions"
        );
      }
      let _location = await Location.getLastKnownPositionAsync({});
      if (_location == null) {
        _location = await Location.getCurrentPositionAsync({
          distanceInterval: 10,
          accuracy: Location.Accuracy.Low,
        });
      }
      setLocation(_location);
      setLoading(false);
    })();
  }, []);

  return (
    <View className="w-full h-full">
      {/* Top Segment */}
      <View className="flex basis-10/12 justify-center items-center p-6">
        {loading ? (
          <View className="w-full flex justify-center items-center">
            <View className="flex justify-center items-center w-full basis-10/12">
              <Text className="text-center font-bold text-gray-800">
                Loading...
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text className="text-gray-800 font-bold uppercase">
              Longitude : {location.coords.longitude}
            </Text>
            <Text className="text-gray-800 font-bold uppercase">
              Latitude : {location.coords.latitude}
            </Text>
          </View>
        )}
      </View>
      {/* Footer */}
      <Footer
        navigation={navigation}
        nextScreen="ScreenFour"
        content={{ carBrand, carModel, licensePlate, location, photos }}
        loading={loading}
      />
    </View>
  );
};

export default ScreenThree;
