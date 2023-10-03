import { Button, HStack, Heading, Input, Spinner, Stack } from "native-base";
import React, { useState } from "react";
import { Text, View, Alert } from "react-native";

import { signIn, signUp } from "../functions/Userauthentication";

const SignedOut = () => {
  // States
  const [login, setLogin] = useState<boolean>(true); // Holds the state of whether the user is logging in or signing up
  const [show, setShow] = useState<boolean>(false); // Holds the state of whether the password is shown or not
  const [username, setUsername] = useState<string | null>(null); // Holds the state of the username
  const [password, setPassword] = useState<string | null>(null); // Holds the state of the password
  const [loading, setLoading] = useState<boolean>(false); // Not show anything until the app is ready

  async function RunLogin() {
    if (!username && !password) {
      Alert.alert(
        "No Username or Password",
        "Please fill in the username and password fields",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        {
          cancelable: true,
        }
      );
      console.error("No Username or Password");
      return;
    }

    if (login) {
      setLoading(true);
      await signIn(username, password).then(() => setLoading(false));
    } else {
      setLoading(true);
      await signUp(username, password).then(() => setLoading(false));
    }
  }

  return (
    <View className="flex justify-center items-center h-full w-full space-y-24">
      {loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        <>
          <View>
            <Text className="text-center text-3xl text-gray-800">VIMA</Text>
            <Text className="text-center text-sm text-gray-800">
              {login
                ? "Log into your VIMA account"
                : "Create your account to get started"}
            </Text>
          </View>

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

          <View className="flex flex-row justify-center items-center space-x-12">
            <Button onPress={() => RunLogin()}>
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
          <Text
            onPress={() => setLogin((login) => !login)}
            className="underline"
          >
            Change to {login ? "Sign Up" : "Login"}
          </Text>
        </>
      )}
    </View>
  );
};

export default SignedOut;
