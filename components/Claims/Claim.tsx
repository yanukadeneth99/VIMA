import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { getClaimStatus, deleteDocument } from "../../functions/Claims";
import { deleteImage } from "../../functions/FileUpload";
import PushAlert from "../../functions/Alert";

const Claim = ({ id, licensePlate, status, images, createdAt }) => {
  // States
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading

  // Handle Delete Claim
  async function handleDeleteClaim() {
    setLoading(true);

    // First Delete the images
    for (const image of images) {
      console.log("Deleting image: ", image);
      await deleteImage(image);
    }

    // Delete the Document
    await deleteDocument(id).then(() => {
      PushAlert("Success", "Deleted Claim");
      console.log("Deleted Claim:", id);
      setLoading(false);
    });
  }

  return (
    <>
      <View className="flex flex-row justify-around items-center w-full p-2">
        <Text className="text-gray-800">{licensePlate}</Text>
        <Text className="uppercase text-blue-700 font-bold">
          {getClaimStatus(status)}
        </Text>
        <Pressable
          disabled={loading}
          onPress={handleDeleteClaim}
          className={` ${loading ? "bg-gray-800" : "bg-blue-500"}  px-2 p-1`}
        >
          <Text>Delete</Text>
        </Pressable>
      </View>
      <ScrollView horizontal>
        <View className="flex flex-row justify-evenly items-center space-x-3">
          {images.map((uri) => {
            return (
              <Image
                key={uri}
                source={{
                  uri,
                }}
                className="w-36 h-36"
                transition={1000}
                placeholder="loading..."
              />
            );
          })}
        </View>
      </ScrollView>
      <Text>{createdAt.toDate().toString()}</Text>
    </>
  );
};

export default Claim;
