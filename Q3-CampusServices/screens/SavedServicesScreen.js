import React from "react";

import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { useApp } from "../context/AppContext";

export default function SavedServicesScreen() {
  const {
    savedServices,
    removeSavedService,
    theme,
  } = useApp();

  const isDark = theme === "dark";

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
        Saved Services
      </Text>

      <Text
        style={[
          styles.count,
          isDark && styles.darkText,
        ]}
      >
        Saved Services:{" "}
        {savedServices.length}
      </Text>

      <FlatList
        data={savedServices}

        keyExtractor={(item) =>
          item.id
        }

        ListEmptyComponent={
          <View style={styles.empty}>
            <Text
              style={[
                styles.emptyTitle,
                isDark &&
                  styles.darkText,
              ]}
            >
              No saved services
            </Text>

            <Text
              style={[
                styles.emptyText,
                isDark &&
                  styles.darkDescription,
              ]}
            >
              Save services from the
              Services screen.
            </Text>
          </View>
        }

        renderItem={({ item }) => (
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
              style={styles.removeButton}
              onPress={() =>
                removeSavedService(
                  item.id
                )
              }
            >
              <Text
                style={styles.buttonText}
              >
                Remove
              </Text>
            </Pressable>
          </View>
        )}
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
    color: "#111827",
    marginBottom: 10,
  },

  count: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 15,
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
    marginVertical: 8,
  },

  darkText: {
    color: "#FFFFFF",
  },

  darkDescription: {
    color: "#D1D5DB",
  },

  removeButton: {
    backgroundColor: "#DC2626",
    padding: 11,
    borderRadius: 7,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  empty: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#6B7280",
    marginTop: 6,
  },
});