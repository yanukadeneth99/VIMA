import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

interface FooterProps {
  navigation: any;
  nextScreen: string;
  content: FooterObj;
  loading?: boolean;
}

interface FooterObj {
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
  location?: Location.LocationObject;
  photos?: MediaLibrary.Asset[];
}

export { FooterObj, FooterProps };
