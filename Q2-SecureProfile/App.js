import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase/firebaseConfig";

import AuthScreen from "./screens/AuthScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);

        setCheckingAuth(false);
      }
    );

    return unsubscribe;
  }, []);

  // check session
  if (checkingAuth) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Checking authentication...
        </Text>
      </View>
    );
  }

  // not logged in
  if (!user) {
    return <AuthScreen />;
  }

  // logged in
  return <ProfileScreen user={user} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
  },
});