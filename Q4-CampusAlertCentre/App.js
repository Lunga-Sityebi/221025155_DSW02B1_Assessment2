import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";

const alerts = [
  {
    id: "1",
    title: "Library Closing Early",
    message:
      "The library will close at 16:00 today.",
  },
  {
    id: "2",
    title: "Campus Wi-Fi Maintenance",
    message:
      "Wi-Fi maintenance is scheduled tonight.",
  },
  {
    id: "3",
    title: "Registration Reminder",
    message:
      "Complete your module registration before the deadline.",
  },
  {
    id: "4",
    title: "Student Centre Update",
    message:
      "The Student Centre will open at 09:00 tomorrow.",
  },
];

export default function App() {
  const [saved, setSaved] = useState([]);

  // Fix 1:
  // immutable state
  const toggleSaved = (id) => {
    setSaved((currentSaved) => {
      if (currentSaved.includes(id)) {
        return currentSaved.filter(
          (savedId) => savedId !== id
        );
      }

      return [
        ...currentSaved,
        id,
      ];
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        UJ Campus Alert Centre
      </Text>

      <Text style={styles.savedCount}>
        Saved Alerts: {saved.length}
      </Text>

      <FlatList
        data={alerts}

        // FIX 2: STABLE UNIQUE KEY
        keyExtractor={(item) => item.id}

        contentContainerStyle={
          styles.list
        }

        renderItem={({ item }) => (
          <AlertCard
            item={item}
            saved={saved.includes(item.id)}
            toggleSaved={toggleSaved}
          />
        )}
      />

    </View>
  );
}

// alert card
function AlertCard({
  item,
  saved,
  toggleSaved,
}) {

  // FIX 3:
  // Animated.Value survives re-renders
  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(15)
  ).current;

  // entrance animation
  useEffect(() => {

    Animated.parallel([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        slideAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }
      ),

    ]).start();

  }, []);


  return (
    <Animated.View
      style={[
        styles.card,

        saved && styles.savedCard,

        {
          opacity: fadeAnim,

          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}
    >

      <Text style={styles.alertTitle}>
        {item.title}
      </Text>

      <Text style={styles.message}>
        {item.message}
      </Text>

      <Pressable

        // FIX 4:
        // function runs WHEN pressed
        onPress={() =>
          toggleSaved(item.id)
        }

        style={[
          styles.button,
          saved && styles.savedButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {saved ? "Saved" : "Save"}
        </Text>
      </Pressable>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingTop: 60,
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: "#111827",
  },

  savedCount: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 15,
    color: "#374151",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,

    borderWidth: 2,
    borderColor: "transparent",

    elevation: 2,
  },

  savedCard: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  message: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 7,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 11,
    borderRadius: 7,
    alignItems: "center",
  },

  savedButton: {
    backgroundColor: "#059669",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});