# Vehicle Insurance Mobile Application

VIMA is a mobile and web application that lets users create claims to their insurances whenever they come across an accident. This application is focused towards **performance, simplicity and support**.

- **Performance** - The application needs to be fast enough so that the user can file a claim as fast as possible and focus on the other aspects in an accident.
- **Simplicity** - This application interface should be very intuitive and simple so that the process should be easy with minimal information because the user cannot focus on giving loads of information when in an accident. The user can quickly file a claim and focus on the other immediate aspects.
- **Support** - This app should be supported by most of the common used Android and iOS devices.

## Disclaimer

This application is **not** for Emergencies or Health related accidents. If anyone comes across any serious injury, focusing on your health is paramount - insurance can come later.

## Status

This application is still under development. As of yet, no Production ready version is available.

## Features

- Create User Authentication
- Create Claims
- Camera and Geolocation

## Development Information

This application uses Expo (React Native) and Firebase. This application is open-source following the license mentioned in this repository. Feel free to create issues or suggest fixes or features to make this appication better!

### Getting Started

Create a `.env` file in the root and fill in the following details :

```js
EXPO_PUBLIC_APIKEY = "";
EXPO_PUBLIC_AUTHDOMAIN = "";
EXPO_PUBLIC_PROJECTID = "";
EXPO_PUBLIC_STORAGEBUCKET = "";
EXPO_PUBLIC_MESSAGESENDERID = "";
EXPO_PUBLIC_APPID = "";
EXPO_PUBLIC_MEASUREMENTID = "";
```

Then create a `eas.json` file and include the following:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_APIKEY": "",
        "EXPO_PUBLIC_AUTHDOMAIN": "",
        "EXPO_PUBLIC_PROJECTID": "",
        "EXPO_PUBLIC_STORAGEBUCKET": "",
        "EXPO_PUBLIC_MESSAGESENDERID": "",
        "EXPO_PUBLIC_APPID": "",
        "EXPO_PUBLIC_MEASUREMENTID": ""
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_APIKEY": "",
        "EXPO_PUBLIC_AUTHDOMAIN": "",
        "EXPO_PUBLIC_PROJECTID": "",
        "EXPO_PUBLIC_STORAGEBUCKET": "v",
        "EXPO_PUBLIC_MESSAGESENDERID": "",
        "EXPO_PUBLIC_APPID": "",
        "EXPO_PUBLIC_MEASUREMENTID": ""
      }
    },
    "production": {}
  }
}
```

> Note : You can create these when you create a Web App in Firebase

Follow [Getting Started with Expo](https://docs.expo.dev/) to get started with Expo (React Native).

### Documentation

These are the recommended documentations to follow for this app.

- [React Native Docs](https://reactnative.dev/docs/pressable)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [React Navigation](https://reactnavigation.org/docs/tab-based-navigation/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Expo](https://docs.expo.dev/)
