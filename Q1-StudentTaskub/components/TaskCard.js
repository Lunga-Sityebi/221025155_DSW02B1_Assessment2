import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}) {
  // Choose priority styling
  const getPriorityStyle = () => {
    if (task.priority === "High") {
      return styles.highPriority;
    }

    if (task.priority === "Medium") {
      return styles.mediumPriority;
    }

    return styles.lowPriority;
  };

  return (
    <View
      style={[
        styles.card,

        // Visually distinguish completed tasks
        task.completed && styles.completedCard,
      ]}
    >
      {/* TOP SECTION */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,

              task.completed &&
                styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>

          <Text style={styles.module}>
            {task.moduleCode}
          </Text>
        </View>

        {/* PRIORITY */}
        <View
          style={[
            styles.priorityBadge,
            getPriorityStyle(),
          ]}
        >
          <Text style={styles.priorityText}>
            {task.priority}
          </Text>
        </View>
      </View>

      {/* STATUS */}
      <Text
        style={[
          styles.status,

          task.completed
            ? styles.completedStatus
            : styles.incompleteStatus,
        ]}
      >
        {task.completed
          ? "Completed"
          : "Incomplete"}
      </Text>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <Pressable
          style={styles.completeButton}
          onPress={() => onToggle(task)}
        >
          <Text style={styles.buttonText}>
            {task.completed
              ? "Re-open"
              : "Complete"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(task)}
        >
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  completedCard: {
    backgroundColor: "#F3F4F6",
    opacity: 0.7,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  completedTitle: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },

  module: {
    marginTop: 5,
    color: "#6B7280",
    fontWeight: "500",
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  priorityText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  lowPriority: {
    backgroundColor: "#16A34A",
  },

  mediumPriority: {
    backgroundColor: "#D97706",
  },

  highPriority: {
    backgroundColor: "#DC2626",
  },

  status: {
    marginTop: 15,
    fontWeight: "600",
  },

  completedStatus: {
    color: "#16A34A",
  },

  incompleteStatus: {
    color: "#D97706",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  completeButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});