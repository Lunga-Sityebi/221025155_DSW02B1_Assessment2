import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native'

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [saving, setSaving] = useState(false);


  const handleAddTask = async () => {
    // Validation
    if (!title.trim() || !moduleCode.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter a task title and module code."
      );

      return;
    }

    try {
      setSaving(true);

      // Write task to Firestore
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        moduleCode: moduleCode.trim(),
        priority: priority,

        // New tasks must start incomplete
        completed: false,

        // Server timestamp
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setModuleCode("");
      setPriority("Medium");

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Task could not be created. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Add Task
      </Text>

      {/* TITLE */}
      <Text style={styles.label}>
        Task Title
      </Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Complete assignment"
        value={title}
        onChangeText={setTitle}
      />

      {/* MODULE */}
      <Text style={styles.label}>
        Module Code
      </Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. DSW02B1"
        value={moduleCode}
        onChangeText={setModuleCode}
        autoCapitalize="characters"
      />

      {/* PRIORITY */}
      <Text style={styles.label}>
        Priority
      </Text>

      <View style={styles.priorityRow}>
        {["Low", "Medium", "High"].map((value) => (
          <Pressable
            key={value}
            onPress={() => setPriority(value)}
            style={[
              styles.priorityButton,

              priority === value &&
                styles.selectedPriority,
            ]}
          >
            <Text
              style={[
                styles.priorityButtonText,

                priority === value &&
                  styles.selectedPriorityText,
              ]}
            >
              {value}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ADD BUTTON */}
      <Pressable
        onPress={handleAddTask}
        disabled={saving}
        style={[
          styles.addButton,
          saving && styles.disabledButton,
        ]}
      >
        <Text style={styles.addButtonText}>
          {saving ? "Adding Task..." : "Add Task"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },

  heading: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 14,
  },

  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },

  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  selectedPriority: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  priorityButtonText: {
    fontWeight: "600",
    color: "#374151",
  },

  selectedPriorityText: {
    color: "#FFFFFF",
  },

  addButton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});