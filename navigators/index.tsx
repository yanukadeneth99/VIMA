/*
 * Main Navigation that controls which sets of interfaces are shown according to whether the user has
 * logged in or not
 */

import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { auth } from "../config/firebase";

const RootNagivator = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true); // Not show anything until the app is ready.
  const [user, setUser] = useState<User | null>(null); // Holds the user object. If a user exists, then app shows the SignedIn UI

  // Firebase Analytics
  const analytics = getAnalytics();

  // Handling Authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loading) setLoading(false);

      if (user) {
        // Log Events
        logEvent(analytics, "notification_received");
      }
    });
  }, []);

  //! Important to prevent calling the APIs before firebase is ready
  if (loading) return null;

  return user ? <SignedIn /> : <SignedOut />;
};

export default RootNagivator;
