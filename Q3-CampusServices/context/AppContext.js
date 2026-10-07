import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const SAVED_KEY = "@campus_saved_services";
const THEME_KEY = "@campus_theme";

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([]);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData =
          await AsyncStorage.getItem(
            SAVED_KEY
          );

        const savedTheme =
          await AsyncStorage.getItem(
            THEME_KEY
          );

        if (savedData !== null) {
          setSavedServices(
            JSON.parse(savedData)
          );
        }

        if (savedTheme !== null) {
          setTheme(savedTheme);
        }

      } catch (error) {
        console.log(
          "Error loading data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const saveServices = async () => {
        try {
          await AsyncStorage.setItem(
            SAVED_KEY,
            JSON.stringify(savedServices)
          );
        } catch (error) {
          console.log(
            "Error storing services:",
            error
          );
        }
      };

      saveServices();
    }
  }, [savedServices, loading]);

  useEffect(() => {
    if (!loading) {
      const saveTheme = async () => {
        try {
          await AsyncStorage.setItem(
            THEME_KEY,
            theme
          );
        } catch (error) {
          console.log(
            "Error storing theme:",
            error
          );
        }
      };

      saveTheme();
    }
  }, [theme, loading]);

  const addSavedService = (service) => {
    setSavedServices((current) => {
      const exists = current.some(
        (item) =>
          item.id === service.id
      );

      if (exists) {
        return current;
      }

      return [
        ...current,
        service,
      ];
    });
  };

  const removeSavedService = (id) => {
    setSavedServices((current) =>
      current.filter(
        (service) =>
          service.id !== id
      )
    );
  };

  const toggleTheme = () => {
    setTheme((current) =>
      current === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <AppContext.Provider
      value={{
        savedServices,
        addSavedService,
        removeSavedService,
        theme,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}