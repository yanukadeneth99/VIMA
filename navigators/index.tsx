/*
Main Navigation that controls which sets of interfaces are shown according to whether the user has
logged in or not
*/

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

const RootNagivator = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true); // Not show anything until the app is ready
  const [user, setUser] = useState<User | null>(null);

  // Handling Authentication
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loading) setLoading(false);
    });
  }, []);

  //TODO: Use splash screen
  if (loading) return null;

  return user ? <SignedIn /> : <SignedOut />;
};

export default RootNagivator;
