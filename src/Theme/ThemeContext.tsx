import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightColors = {
  backgroundMain: "#FAFAFA",
  backgroundCard: "#F5EDEB",
  primary: "#E66A6A",
  secondary: "#2B2B2B",
  text: "#2B2B2B",
};

const darkColors = {
  backgroundMain: "#1A1A1A",
  backgroundCard: "#4A3A39",
  primary: "#C85858",
  secondary: "#E0E0E0",
  text: "#E0E0E0",
};

interface ThemeContextType {
  isLight: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isLight: true,
  colors: lightColors,
  toggleTheme: () => {},
  loading: true,
});

export const ThemeProvider = ({ children }: any) => {
  const [isLight, setIsLight] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) setIsLight(savedTheme === "light");
      setLoading(false);
    })();
  }, []);

  const toggleTheme = async () => {
    setIsLight(prev => {
      const newValue = !prev;
      AsyncStorage.setItem("appTheme", newValue ? "light" : "dark");
      return newValue;
    });
  };

  if (loading) return null; // or a splash/loading screen

  return (
    <ThemeContext.Provider value={{ isLight, colors: isLight ? lightColors : darkColors, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
