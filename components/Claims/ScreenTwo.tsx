/*
 * Screen 2 - Handling Camera and getting Photos
 */

import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Text, View, Image, ScrollView, Button, Pressable } from "react-native";

import Footer from "./Footer";

// TODO : Add Media Picker to select images
const ScreenTwo = ({ route, navigation }) => {
  // States
  const [type, setType] = useState<CameraType>(CameraType.back); // Holds the camera type - back camera, front camera, etc
  const [permission, requestPermission] = Camera.useCameraPermissions(); // Holds whether the app has permissions for the camera
  const [permissionMedia, requestPermissionMedia] =
    MediaLibrary.usePermissions(); // Holds whether the app has permissions for the media library
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]); // Holds the photos taken by the user
  const cameraRef = useRef<Camera>(); // Holds the Instantiated Camera Object as Reference

  // Passed Values from previous screen
  const { carBrand, carModel, licensePlate } = route.params;

  // Request Camera and Media permissions as soon as the screen loads
  useEffect(() => {
    requestPermission();
    requestPermissionMedia();
    ImagePicker.requestMediaLibraryPermissionsAsync();
    ImagePicker.requestCameraPermissionsAsync();
  }, []);

  // Function to Toggle Camera Type between front and back
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // Function to take a picture and save it into device
  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync();
    const savedPhoto = await MediaLibrary.createAssetAsync(photo.uri);
    setPhotos((current) => [...current, savedPhoto]);
    console.log(savedPhoto);
  }

  // This is what gets displayed if permissions are not asked yet or are processing
  if (!permission || !permissionMedia) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <View className="flex justify-center items-center w-full basis-10/12">
          <Text className="text-center font-bold text-gray-800">
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex justify-center items-center w-full h-full">
      {/* Displays according to whether permissions were given or not */}
      {!permission.granted || !permissionMedia.granted ? (
        //* Permissions were not granted

        <View className="w-full h-full flex justify-center items-center space-y-5">
          {!permission.granted && (
            <Text className="text-red-500 font-bold uppercase">
              Camera permissions not granted
            </Text>
          )}
          {!permissionMedia.granted && (
            <Text className="text-red-500 font-bold uppercase">
              Media permissions not granted
            </Text>
          )}
          {!permission.granted && (
            <Button
              onPress={requestPermission}
              title="Request Camera Permission"
            />
          )}
          {!permissionMedia.granted && (
            // TODO: This isn't working, check later
            <Button
              onPress={requestPermissionMedia}
              title="Request Media Permission"
            />
          )}
        </View>
      ) : (
        //* Permissions granted, show camera and others

        <View className="flex basis-10/12 w-full justify-center items-center">
          {/* Camera */}
          <View className="p-2 w-full basis-5/6">
            <Camera
              className="w-full h-full flex flex-col justify-between items-center"
              type={type}
              ref={cameraRef}
            >
              {/* Change Camera */}
              <View className="w-full flex justify-center items-end pr-3 pt-3">
                <Pressable
                  onPress={toggleCameraType}
                  className="bg-gray-200/20 rounded p-3"
                >
                  <Text className="text-center">
                    <Ionicons name="camera-reverse" size={24} color="gray" />
                  </Text>
                </Pressable>
              </View>

              {/* Take Picture */}
              <Pressable
                onPress={() => takePicture()}
                className="bg-white rounded-full p-4 mb-3"
              >
                <Text className="text-center">
                  <FontAwesome name="camera" size={32} color="black" />
                </Text>
              </Pressable>
            </Camera>
          </View>

          {/* Images */}
          <View className="flex basis-1/6 w-full justify-center items-center">
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className=""
            >
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
            </ScrollView>
          </View>
        </View>
      )}

      {/* Footer */}
      <Footer
        navigation={navigation}
        nextScreen="ScreenThree"
        content={{ carBrand, carModel, licensePlate, photos }}
        loading={!permission || !permissionMedia.granted || photos.length < 1}
      />
    </View>
  );
};

export default ScreenTwo;
