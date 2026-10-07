import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";


import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase/firebaseConfig";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const tasksRef = collection(db, "tasks");

    const unsubscribe = onSnapshot(
      tasksRef,
      (snapshot) => {
        const taskList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setTasks(taskList);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.log(err);
        setError("Failed to load tasks.");
        setLoading(false);
      }
    );

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  
  const toggleTask = async (task) => {
    try {
      setError("");

      const taskRef = doc(db, "tasks", task.id);

      await updateDoc(taskRef, {
        completed: !task.completed,
      });
    } catch (err) {
      console.log(err);
      setError("Failed to update task.");
    }
  };


  const deleteTask = (task) => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setError("");

              await deleteDoc(
                doc(db, "tasks", task.id)
              );
            } catch (err) {
              console.log(err);
              setError("Failed to delete task.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Student Task Hub
      </Text>

      <Text style={styles.subtitle}>
        Keep track of your academic tasks
      </Text>

      {/* ADD TASK FORM */}
      <TaskForm />

      {/* ERROR */}
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>
        My Tasks ({tasks.length})
      </Text>

      {/* LOADING */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading tasks...
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}

          // Stable Firestore document ID
          keyExtractor={(item) => item.id}

          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}

          contentContainerStyle={
            tasks.length === 0
              ? styles.emptyContainer
              : styles.list
          }

          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No tasks
              </Text>

              <Text style={styles.emptyText}>
                Add your first academic task above.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    color: "#111827",
  },

  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },

  errorText: {
    color: "#B91C1C",
  },

  center: {
    paddingVertical: 40,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },

  list: {
    paddingBottom: 50,
  },

  emptyContainer: {
    flexGrow: 1,
  },

  empty: {
    alignItems: "center",
    paddingTop: 50,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyText: {
    marginTop: 6,
    color: "#6B7280",
  },
});