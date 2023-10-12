/*
 * This page handles what gets shown to the user when the user is Signed Out
 */

import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";

import { signIn, signUp } from "../functions/Userauthentication";
import PushAlert from "../functions/Alert";

const SignedOut = () => {
  // States
  const [login, setLogin] = useState<boolean>(true); // Holds the state of whether the user is logging in or signing up to show different texts based on it
  const [show, setShow] = useState<boolean>(false); // Holds the state of whether the password is shown or not
  const [username, setUsername] = useState<string | null>(null); // Holds the typed username
  const [password, setPassword] = useState<string | null>(null); // Holds the typed password
  const [loading, setLoading] = useState<boolean>(false); // Loading when the user registers or logs in

  // Handles the login and signup
  async function RunLogin() {
    // This is not needed since the button is disabled when the username or password is empty, but just in case - Empty uname and pass are handled in the button, here and in firebase APIs
    if (!username && !password) {
      PushAlert(
        "No Username or Password",
        "Please fill in the username and password fields"
      );
      console.error("No Username or Password");
      return;
    }

    // Handling what happens depending on the state of whether the user is logging in or signing up
    setLoading(true);
    if (login) {
      await signIn(username, password).then(() => setLoading(false));
    } else {
      await signUp(username, password).then(() => setLoading(false));
    }
  }

  return (
    <View className="flex justify-center items-center h-full w-full">
      {loading ? (
        <Text>Loading... </Text>
      ) : (
        <>
          <View className="flex w-full basis-2/12 justify-center items-center">
            <Text className="text-center text-3xl text-blue-600">VIMA</Text>
            <Text className="text-center text-sm text-gray-800">
              {login
                ? "Log into your VIMA account"
                : "Create your account to get started"}
            </Text>
          </View>

          <View className="flex w-full basis-8/12 justify-center space-y-16 items-center">
            {/* Username Field */}
            <TextInput
              editable
              autoCorrect={false}
              autoFocus
              inputMode="email"
              keyboardType="email-address"
              enterKeyHint="next"
              placeholder="Username"
              autoCapitalize="none"
              autoComplete="email"
              onChangeText={(text) => setUsername(text)}
              value={username}
              className="border-2 border-blue-800/20 rounded-md p-2 w-10/12"
            />
            <View className="flex flex-row w-10/12 justify-center items-center border-2 border-blue-800/20  rounded-md">
              {/* Password Field */}
              <TextInput
                editable
                autoCorrect={false}
                autoFocus={false}
                inputMode="text"
                enterKeyHint="next"
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!show}
                value={password}
                className="basis-10/12 p-2"
              />
              {/* Show password toggle */}
              <Pressable
                className="flex basis-2/12 p-2 justify-center rounded-md items-center"
                onPress={() => setShow((show) => !show)}
              >
                <Text className="text-center text-blue-500">
                  {show ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="flex w-full basis-2/12 justify-center items-center space-y-4">
            <View className="flex flex-row justify-evenly items-center w-full">
              {/* Login/Signup Button */}
              <Pressable
                onPress={() => RunLogin()}
                disabled={!(username && password)}
                className={`flex justify-center items-center ${
                  !username || !password
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-400"
                }   rounded-md p-2 px-6`}
              >
                <Text className="text-white">
                  {login ? "Login" : "Create Account"}
                </Text>
              </Pressable>

              {/* Clear Button */}
              <Pressable
                onPress={() => {
                  setPassword(null);
                  setUsername(null);
                }}
                className="flex justify-center items-center border border-blue-400 rounded-md p-2 px-6"
              >
                <Text className="text-gray-700">Clear</Text>
              </Pressable>
            </View>
            {/* Clickable text to change whether users wants to create an account or sign in. Login by default */}
            <Text
              onPress={() => setLogin((login) => !login)}
              className="underline text-gray-800"
            >
              Change to {login ? "Sign Up" : "Login"}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SignedOut;
