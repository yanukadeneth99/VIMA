import * as Location from "expo-location";

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
}

export { FooterObj, FooterProps };
