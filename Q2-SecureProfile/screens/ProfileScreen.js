import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { signOut, } from "firebase/auth";

import {
  auth,
  db,
} from "../firebase/firebaseConfig";

export default function ProfileScreen({user,}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // get current user profile  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const profileRef = doc(
          db,
          "users",
          user.uid
        );

        const snapshot =
          await getDoc(profileRef);

        if (snapshot.exists()) {
          setProfile(
            snapshot.data()
          );
        } else {
          setError(
            "Profile could not be found."
          );
        }

      } catch (error) {
        console.log(error);

        setError(
          "Failed to load profile."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProfile();

  }, [user.uid]);

  // logout
  const handleLogout = async () => {
    try {

      setProfile(null);

      await signOut(auth);

    } catch (error) {
      console.log(error);

      setError(
        "Could not sign out."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>
        Student Profile
      </Text>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      {profile && (
        <View style={styles.card}>

          <Text style={styles.smallText}>
            STUDENT NAME
          </Text>

          <Text style={styles.value}>
            {profile.studentName}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.smallText}>
            EMAIL
          </Text>

          <Text style={styles.value}>
            {profile.email}
          </Text>

        </View>
      )}

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Sign Out
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
    paddingTop: 60,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
  },

  smallText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "bold",
  },

  value: {
    fontSize: 18,
    color: "#111827",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  error: {
    color: "#DC2626",
    marginBottom: 15,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
  },
});