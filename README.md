# Vehicle Insurance Mobile Application

VIMA is a mobile and web application that lets users create claims to their insurances whenever they come across an accident. This application is focused towards **performance, simplicity and support**.

- **Performance** - The application needs to be fast enough so that the user can file a claim as fast as possible and focus on the other aspects in an accident.
- **Simplicity** - This application interface should be very intuitive and simple so that the process should be easy with minimal information because the user cannot focus on giving loads of information when in an accident. The user can quickly file a claim and focus on the other immediate aspects.
- **Support** - This app should be supported by most of the common used Android and iOS devices.

You can learn more about the architecture of this application in [this](https://github.com/yanukadeneth99/VIMA/wiki) wiki.

## Disclaimer

This application is **not** for Emergencies or Health related accidents. If anyone comes across any serious injury, focusing on your health is paramount - insurance can come later.

## Status

This application, made as a mockup (test app), is now complete. You can download the APK for the application for Android [here](https://github.com/yanukadeneth99/VIMA/releases/tag/v1.0). Please note that there is no Production ready version of this application or never will be. Check below for Contributions.

## Features

- Create User Authentication
- Create Claims
- Camera and Geolocation

## Demo Video

[![VIMADemoVideo](https://img.youtube.com/vi/TzCEN0FVQfs/maxresdefault.jpg)](https://youtu.be/TzCEN0FVQfs)

## Development Information

This application uses Expo (React Native) and Firebase.

This application is open-source following the [MIT License](./LICENSE). Feel free to create issues or suggest fixes or features to make this appication better - check out the [Contributing Guidelines](./CONTRIBUTING.md)!

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
        "EXPO_PUBLIC_STORAGEBUCKET": "",
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

### Issues and Suggestions

Contributions for these fixes or suggestions are highly appreciated. Just to note, this application will never get a production version that will be available on stores. Therefore, treat any contributions as a means to learn.

- **Photo issue on iOS** - The app does not work properly on iOS. Suggestions: Check [this file](https://github.com/yanukadeneth99/VIMA/blob/master/functions/FileUpload.ts#L26) out for a fix.
- **UI Enhancements** - The app uses [Nativewind](https://www.nativewind.dev/) for design. Design consistencies are appreciated to make the elements look like they are from the same app.
- **Image Editing** - When the images are taken in the create form interface, they cannot be edited or removed. Create a component system to do just that.
- **Camera not working when Back button is pressed from final submit screen** - You can see this issue on the demo video attached above. Suggestions: Check how the back button is triggered and run the permissions and loading of the camera everytime the component is loaded.
- **Claims Editing** - Claims that are made cannot be edited, only deleted. Create a component to edit claims.
