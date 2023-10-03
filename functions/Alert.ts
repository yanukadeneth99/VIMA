/*
 * File handling Alerts
 */

import { Alert } from "react-native";

// Function to push an alert to the user
export default function PushAlert(header: string, footer: string) {
  Alert.alert(`${header}`, `${footer}`, [{ text: "OK" }], {
    cancelable: true,
  });
}
