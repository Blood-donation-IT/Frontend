import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";

import { CommonActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLight, colors, toggleTheme } = useTheme();
  const { logout } = useAuthStore();
  const [language, setLanguage] = useState("en");
  const insets = useSafeAreaInsets();

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

  const changeLanguage = async (langCode) => {
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

  const blockBackgroundColor = isLight ? "#fbfbfbff" : "#1a1a1aff";
  
  const dividerColor = isLight ? "#fbfbfbff" : "#1a1a1aff";
 
  const adminBtnTextColor = isLight ? "#fbfbfbff" : "#1a1a1aff";

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.backgroundMain || "#f9f9f9ff" }]}>
      
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../images/arrow-left.png")}
            style={[styles.backImg, { tintColor: colors.text || "#000000ff" }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text || "#000000" }]}>
          {t("settings") || "Settings"}
        </Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary || "#F86E6E" }]}>
            {t("language") || "Language"}
          </Text>
          <View style={[styles.blockContainer, { backgroundColor: blockBackgroundColor }]}>
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.option,
                  index !== languages.length - 1 && { borderBottomWidth: 1, borderBottomColor: dividerColor }
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <Text style={[styles.flag , {color: colors.text}]}>{lang.flag}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary || "#F86E6E" }]}>
            {t("system") || "System"}
          </Text>
          <View style={[styles.blockContainer, { backgroundColor: blockBackgroundColor }]}>
            <View style={styles.option}>
              <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                {t("dark_mode") || "Dark Mode"}
              </Text>
              <Switch
                trackColor={{ false: "#e4e4e4", true: colors.primary || "#F86E6E" }}
                ios_backgroundColor="#e4e4e4"
                thumbColor={"#ffffff"}
                onValueChange={toggleTheme}
                value={!isLight} 
              />
            </View>
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary || "#F86E6E" }]}>
            {t("password") || "Password"}
          </Text>
          <View style={[styles.blockContainer, { backgroundColor: blockBackgroundColor }]}>
            <TouchableOpacity style={styles.option}>
              <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                {t("change_password") || "Change Password"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary || "#F86E6E" }]}>
            {t("other") || "Other"}
          </Text>
          <View style={[styles.blockContainer, { backgroundColor: blockBackgroundColor }]}>
            <TouchableOpacity style={[styles.option, { borderBottomWidth: 1, borderBottomColor: dividerColor }]}>
              <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                {t("faq") || "FAQ"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { borderBottomWidth: 1, borderBottomColor: dividerColor }]}>
              <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                {t("about_us") || "About Us"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={[styles.optionText, { color: colors.text || "#000000" }]}>
                {t("support") || "Support"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.adminButton, { backgroundColor: colors.primary || "#F86E6E" }]}>
            <Ionicons name="person-outline" size={18} color={adminBtnTextColor} style={styles.actionIcon} />
            <Text style={[styles.adminButtonText, { color: adminBtnTextColor }]}>{t("go_to_admin") || "Go to Admin"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.deleteOption}>
            <Ionicons name="log-out-outline" size={22} color={colors.primary || "#F86E6E"} />
            <Text style={[styles.deleteText, { color: colors.primary || "#F86E6E" }]}>
              {t("logout") || "Log out"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteOption}>
            <Ionicons name="trash-outline" size={22} color={colors.primary || "#F86E6E"} />
            <Text style={[styles.deleteText, { color: colors.primary || "#F86E6E" }]}>
              {t("delete_account") || "Delete account"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backImg: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginTop: 40,
    
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 40,
    paddingTop: 10,
    
  },
  scrollContent: {
    paddingBottom: 50,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    paddingHorizontal: 20,
    fontWeight: "600",
  },
  blockContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden", 
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14, 
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
  },
  flag: {
    fontSize: 20,
  },
  actionsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    gap: 15, 
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  adminButtonText: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 8,
  },
  deleteOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  deleteText: {
    fontSize: 16,
    marginLeft: 12,
  },
  actionIcon: {
    marginTop: -2,
  }
});

export default SettingsScreen;