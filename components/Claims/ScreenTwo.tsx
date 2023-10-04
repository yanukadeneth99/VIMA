/*
 * Screen 2 - Handling Camera and getting Photos
 */

import { Camera, CameraType } from "expo-camera";
import { Button, HStack, Heading, Spinner } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Text, View, Image } from "react-native";

import Footer from "./Footer";
import CameraObject from "../../interfaces/CameraImage";

// TODO : Add Camera Features
const ScreenTwo = ({ route, navigation }) => {
  // States
  const [type, setType] = useState<CameraType>(CameraType.back); // Holds the camera type - back camera, front camera, etc
  const [permission, requestPermission] = Camera.useCameraPermissions(); // Holds whether the app has permissions for the camera
  const [photos, setPhotos] = useState<CameraObject[]>([]); // Holds the photos taken by the user
  const cameraRef = useRef<Camera>();

  // Passed Values from previous screen
  const { carBrand, carModel, licensePlate } = route.params;

  // Request Camera permissions as soon as the screen loads
  useEffect(() => {
    requestPermission();
  }, []);

  // Function to Toggle Camera Type
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync();
    setPhotos((current) => [...current, photo]);
    console.log(photo);
  }

  // Handle loading
  if (!permission) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="sm">
            Loading Camera...
          </Heading>
        </HStack>
      </View>
    );
  }

  return (
    <View className="w-full h-full">
      {/* Handle whether permission was granted or not */}
      {!permission.granted ? (
        <View className="w-full h-full flex justify-center items-center space-y-5">
          <Text className="text-red-500 font-bold uppercase">
            Permission not granted
          </Text>
          <Button onPress={requestPermission}>Request Permission</Button>
        </View>
      ) : (
        <>
          <View className="flex basis-10/12 justify-center items-center">
            <View className="p-2 w-full basis-5/6">
              <Camera className="w-full h-full" type={type} ref={cameraRef}>
                <Text>S</Text>
                <Button onPress={toggleCameraType}>Change Camera</Button>
                <Button onPress={() => takePicture()}>Take Pic</Button>
              </Camera>
            </View>
            <View className="flex basis-1/6 w-full justify-center items-center">
              <View className="w-full h-full bg-gray-300 flex-row justify-center items-center space-x-2">
                {photos.map((photo) => {
                  return (
                    <Image
                      key={photo.uri}
                      className="w-20 h-20"
                      source={photo}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <Footer
            navigation={navigation}
            nextScreen="ScreenThree"
            content={{ carBrand, carModel, licensePlate, photos }}
            loading={false}
          />
        </>
      )}
    </View>
  );
};

export default ScreenTwo;
