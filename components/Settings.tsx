import { Button } from "native-base";
import React, { useState } from "react";
import { View, Text } from "react-native";

import { logOut } from "../functions/Userauthentication";

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(false);

  async function runLogOut() {
    setLoading(true);
    await logOut().then(() => {
      setLoading(false);
    });
  }

  return (
    <View className="w-full h-full flex justify-center items-center space-y-12">
      {loading ? (
        <Text>Logging out...</Text>
      ) : (
        <>
          <Button disabled={loading} className="w-2/3">
            Option A
          </Button>
          <Button disabled={loading} className="w-2/3">
            Option B
          </Button>
          <Button disabled={loading} className="w-2/3">
            Option C
          </Button>
          <Button disabled={loading} className="w-2/3">
            Option D
          </Button>
          <Button
            onPress={() => runLogOut()}
            className="w-2/3"
            variant="outline"
            colorScheme="secondary"
            disabled={loading}
          >
            Log out
          </Button>
        </>
      )}
    </View>
  );
};

export default Settings;
