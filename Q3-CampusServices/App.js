import React from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  AppProvider,
  useApp,
} from "./context/AppContext";

import HomeScreen from "./screens/HomeScreen";
import ServicesScreen from "./screens/ServicesScreen";
import SavedServicesScreen from "./screens/SavedServicesScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
  const { loading } = useApp();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Services"
          component={ServicesScreen}
        />

        <Stack.Screen
          name="Saved"
          component={SavedServicesScreen}
          options={{
            title: "Saved Services",
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}