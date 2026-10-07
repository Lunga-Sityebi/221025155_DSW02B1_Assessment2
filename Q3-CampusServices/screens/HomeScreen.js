import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useApp } from "../context/AppContext";

export default function HomeScreen({
  navigation,
}) {
  const {
    savedServices,
    theme,
    toggleTheme,
  } = useApp();

  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        isDark && styles.dark,
      ]}
    >
      <Text
        style={[
          styles.title,
          isDark && styles.whiteText,
        ]}
      >
        Campus Services
      </Text>

      <Text
        style={[
          styles.counter,
          isDark && styles.whiteText,
        ]}
      >
        Saved Services:{" "}
        {savedServices.length}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "Services"
          )
        }
      >
        <Text style={styles.buttonText}>
          Browse Services
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "Saved"
          )
        }
      >
        <Text style={styles.buttonText}>
          View Saved Services
        </Text>
      </Pressable>

      <Text
        style={[
          styles.themeText,
          isDark && styles.whiteText,
        ]}
      >
        Theme: {theme}
      </Text>

      <Pressable
        style={styles.themeButton}
        onPress={toggleTheme}
      >
        <Text style={styles.buttonText}>
          Switch to{" "}
          {isDark ? "Light" : "Dark"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8",
  },

  dark: {
    backgroundColor: "#111827",
  },

  whiteText: {
    color: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  counter: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  themeButton: {
    backgroundColor: "#7C3AED",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  themeText: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
});