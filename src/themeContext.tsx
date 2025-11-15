import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightColors = {
  background: "#ffffff",
  text: "#000000",
};

const darkColors = {
  background: "#111111",
  text: "#ffffff",
};

const ThemeContext = createContext({
  isLight: true,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme) setIsLight(savedTheme === "light");
      } catch (e) {
        console.log("Theme load error", e);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    setIsLight(prev => {
      const newValue = !prev;
      AsyncStorage.setItem("appTheme", newValue ? "light" : "dark");
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isLight,
        colors: isLight ? lightColors : darkColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
