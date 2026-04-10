import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../Theme/ThemeContext";
import CustomHeader from "../../../components/CustomHeader";
import { useAuthStore } from "../../../stores/useAuthStore";

import { CommonActions } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLight, colors, toggleTheme } = useTheme();
  const { logout } = useAuthStore();
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "uk", label: "Українська", flag: "🇺🇦" },
  ];

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) {
        setLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }
    })();
  }, []);

  const changeLanguage = async (langCode: string) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
    await AsyncStorage.setItem("appLanguage", langCode);
  };

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "LogIn" }] }),
    );
  };

  const styles = StyleSheet.create({
    flag: {
      fontSize: 18,
    },
    container: {
      padding: 20,
      flexGrow: 1,
      paddingTop: 60,
      backgroundColor: colors.backgroundMain,
      color: colors.text,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 15,
      marginBottom: 10,
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    optionText: {
      color: colors.text,
      fontSize: 18,
    },
    deleteOption: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    deleteText: {
       color: colors.text, fontSize: 16, marginRight: 10 },
  });

  return (
    <>
      <CustomHeader title={t("settings")} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("language")}</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.option}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text style={styles.optionText}>{lang.label}</Text>
              {language === lang.code && (
                <Text style={styles.flag}>{lang.flag}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("system")}</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>{t("light_mode")}</Text>
            <Switch
              trackColor={{ false: "#fff", true: "#E66A6A" }}
              ios_backgroundColor="#fff"
              thumbColor={isLight ? "#F5EDEB80" : "#E66A6A"}
              onValueChange={toggleTheme}
              value={isLight}
            />
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
          <TouchableOpacity onPress={handleLogout} style={styles.deleteOption}>
            <Text style={styles.deleteText}>{t("logout")}</Text>
            <Ionicons name="log-out-outline" size={25} color="#E66A6A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteOption}>
            <Text style={styles.deleteText}>{t("delete_account")}</Text>
            <Ionicons name="trash-outline" size={25} color="#E66A6A" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default SettingsScreen;
