/*
Main Navigation that controls which sets of interfaces are shown according to whether the user has
logged in or not
*/

import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

// import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { auth } from "../config/firebase";

const RootNagivator = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true); // Not show anything until the app is ready
  const [user, setUser] = useState<User | null>(null);

  // Handling Authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loading) setLoading(false);
    });
  }, []);

  if (loading) return null;

  return user ? <SignedOut /> : <SignedOut />;
};

export default RootNagivator;
