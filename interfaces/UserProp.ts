import { User } from "firebase/auth";

export default interface UserProp {
  user: User | null;
}
