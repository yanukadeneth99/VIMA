import { Button, Input, Stack } from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";

const SignedOut = () => {
  // States
  const [login, setLogin] = useState<boolean>(true); // Holds the state of whether the user is logging in or signing up
  const [show, setShow] = useState<boolean>(false); // Holds the state of whether the password is shown or not
  const [username, setUsername] = useState<string | null>(null); // Holds the state of the username
  const [password, setPassword] = useState<string | null>(null); // Holds the state of the password

  return (
    <View className="flex justify-center items-center h-full w-full space-y-24">
      {/* Header */}
      <View>
        <Text className="text-center text-3xl text-gray-800">VIMA</Text>
        <Text className="text-center text-sm text-gray-800">
          {login
            ? "Log into your VIMA account"
            : "Create your account to get started"}
        </Text>
      </View>

      {/* Form */}
      <View>
        <Stack space={4} w="100%" maxW="300px" mx="auto">
          <Input
            size="lg"
            variant="rounded"
            placeholder="Username"
            w="100%"
            onChange={(e) => setUsername(e.nativeEvent.text)}
            value={username}
          />
          <Input
            type={show ? "text" : "password"}
            w="100%"
            variant="rounded"
            size="lg"
            InputRightElement={
              <Button
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={() => setShow((show) => !show)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
            placeholder="Password"
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
          />
        </Stack>
      </View>

      {/* Button to switch between login and sign up */}
      <View className="flex flex-row justify-center items-center space-x-12">
        <Button onPress={() => console.log("Login")}>
          {login ? "Login" : "Create Account"}
        </Button>
        <Button
          variant="outline"
          colorScheme="secondary"
          onPress={() => {
            setPassword(null);
            setUsername(null);
          }}
        >
          Clear
        </Button>
      </View>
      <Text onPress={() => setLogin((login) => !login)} className="underline">
        Change to {login ? "Sign Up" : "Login"}
      </Text>
    </View>
  );
};

export default SignedOut;
