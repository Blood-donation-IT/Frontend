import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightColors = {
  backgroundMain: "#FAFAFA",
  backgroundCard: "#F5EDEB",
  primary: "#E66A6A",
  secondary: "#2B2B2B",
  text: "#2B2B2B",

  pageBg: "#F7E9EA",
  card: "#FFFFFF",
  softCard: "#FFF7F7",
  subText: "rgba(43,43,43,0.60)",
  shadow: "rgba(0,0,0,0.12)",
  brand: "#E55656",
  brand2: "#FF7A7A",
  calendarSurface: "#FFFFFF",
  calendarDow: "rgba(43,43,43,0.55)",
  pillBg: "rgba(255,255,255,0.95)",
  dayText: "#2B2B2B",
  disabledText: "rgba(0,0,0,0.25)",
};

const darkColors = {
  backgroundMain: "#1A1A1A",
  backgroundCard: "#4A3A39",
  primary: "#C85858",
  secondary: "#E0E0E0",
  text: "#E0E0E0",

  pageBg: "#121214",
  card: "#1B1B1F",
  softCard: "#1F1A1A",
  subText: "rgba(244,244,245,0.70)",
  shadow: "rgba(0,0,0,0.45)",
  brand: "#FF6B6B",
  brand2: "#FF7A7A",
  calendarSurface: "#1B1B1F",
  calendarDow: "rgba(244,244,245,0.65)",
  pillBg: "rgba(255,255,255,0.10)",
  dayText: "#F4F4F5",
  disabledText: "rgba(255,255,255,0.35)",
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
