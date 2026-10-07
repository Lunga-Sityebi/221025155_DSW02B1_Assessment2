import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebaseConfig";

export default function AuthScreen() {
  const [registerMode, setRegisterMode] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFriendlyError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Your password is too weak.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/user-not-found":
        return "No account was found.";

      case "auth/wrong-password":
        return "Incorrect email or password.";

      default:
        return "Something went wrong. Please try again.";
    }
  };

  // register
  const handleRegister = async () => {
    if (
      !studentName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      //create account
      const result =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = result.user;

      // create profile
      await setDoc(
        doc(db, "users", user.uid),
        {
          studentName: studentName.trim(),
          email: user.email,
          createdAt: serverTimestamp(),
        }
      );

    } catch (error) {
      console.log(error.code);

      setError(
        getFriendlyError(error)
      );

    } finally {
      setLoading(false);
    }
  };

  //login
  const handleLogin = async () => {
    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    } catch (error) {
      console.log(error.code);

      setError(
        getFriendlyError(error)
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.heading}>
          MyUJ Secure Profile
        </Text>

        <Text style={styles.subtitle}>
          {registerMode
            ? "Create your student account"
            : "Sign in to your account"}
        </Text>

        {/* NAME - REGISTRATION ONLY */}

        {registerMode && (
          <>
            <Text style={styles.label}>
              Student Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={studentName}
              onChangeText={setStudentName}
            />
          </>
        )}

        {/* EMAIL */}

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="student@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* PASSWORD */}

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}

          // IMPORTANT
          secureTextEntry
        />

        {/* ERROR */}

        {error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null}

        {/* LOGIN / REGISTER */}

        <Pressable
          style={[
            styles.button,
            loading && styles.disabledButton,
          ]}
          disabled={loading}
          onPress={
            registerMode
              ? handleRegister
              : handleLogin
          }
        >

          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {registerMode
                ? "Register"
                : "Login"}
            </Text>
          )}

        </Pressable>

        {/* SWITCH MODE */}

        <Pressable
          disabled={loading}
          onPress={() => {
            setRegisterMode(
              !registerMode
            );

            setError("");
          }}
        >
          <Text style={styles.switchText}>
            {registerMode
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 15,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 25,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 13,
    marginBottom: 15,
  },

  error: {
    color: "#DC2626",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  switchText: {
    textAlign: "center",
    color: "#2563EB",
    marginTop: 20,
    fontWeight: "600",
  },
});