import * as Location from "expo-location";

import CameraObject from "./CameraImage";

interface FooterProps {
  navigation: any;
  nextScreen: string;
  content: FooterObj;
  loading: boolean;
}

interface FooterObj {
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
  location?: Location.LocationObject;
  photos?: CameraObject[];
}

export { FooterObj, FooterProps };
