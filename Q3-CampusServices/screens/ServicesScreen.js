import React from "react";

import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { services } from "../data/services";

import { useApp } from "../context/AppContext";

export default function ServicesScreen() {
  const {
    savedServices,
    addSavedService,
    removeSavedService,
    theme,
  } = useApp();

  const isDark = theme === "dark";

  const isSaved = (id) => {
    return savedServices.some(
      (service) =>
        service.id === id
    );
  };

  return (
    <View
      style={[
        styles.container,
        isDark && styles.darkContainer,
      ]}
    >
      <Text
        style={[
          styles.heading,
          isDark && styles.darkText,
        ]}
      >
        Campus Services
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => {
          const saved =
            isSaved(item.id);

          return (
            <View
              style={[
                styles.card,
                isDark && styles.darkCard,
              ]}
            >
              <Text
                style={[
                  styles.name,
                  isDark && styles.darkText,
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.description,
                  isDark &&
                    styles.darkDescription,
                ]}
              >
                {item.description}
              </Text>

              <Pressable
                style={[
                  styles.button,
                  saved &&
                    styles.removeButton,
                ]}
                onPress={() => {
                  if (saved) {
                    removeSavedService(
                      item.id
                    );
                  } else {
                    addSavedService(
                      item
                    );
                  }
                }}
              >
                <Text
                  style={styles.buttonText}
                >
                  {saved
                    ? "Remove"
                    : "Save"}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8",
  },

  darkContainer: {
    backgroundColor: "#111827",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  darkCard: {
    backgroundColor: "#1F2937",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  description: {
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 15,
  },

  darkText: {
    color: "#FFFFFF",
  },

  darkDescription: {
    color: "#D1D5DB",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 11,
    borderRadius: 7,
    alignItems: "center",
  },

  removeButton: {
    backgroundColor: "#DC2626",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});