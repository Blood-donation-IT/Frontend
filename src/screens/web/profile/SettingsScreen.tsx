import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Modal,
  Platform,
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


  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'already_exists' | 'confirm_cancel' | 'confirm_logout'>('success');
  const [onConfirmAction, setOnConfirmAction] = useState<(() => Promise<void>) | null>(null);


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

  const triggerLogoutModal = () => {
    setAlertType('confirm_logout');
    
    setOnConfirmAction(() => async () => {
      try {
        await handleLogout();
      } catch (err) {
        setAlertType('error');
        setAlertVisible(true);
      }
    });

    setAlertVisible(true);
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

          <TouchableOpacity onPress={triggerLogoutModal} style={styles.deleteOption}>
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

        <Modal
          visible={alertVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAlertVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              
              {/* 1. Заголовок і текст підтягуються з локалізації */}
              <Text style={styles.modalTitle}>
                {alertType === 'confirm_logout' && t('logout_dialog_title')} {/* "Вихід з акаунту" */}
              </Text>

              <Text style={styles.modalMessage}>
                {alertType === 'confirm_logout' && t('logout_dialog_message')} {/* "Ви дійсно хочете вийти?" */}
              </Text>

              {/* 2. Рендериться рядок з двома кнопками */}
              {(alertType === 'confirm_cancel' || alertType === 'confirm_logout') && (
                <View style={styles.modalRowButtons}>
                  {/* Кнопка "Ні" — просто закриває вікно */}
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelSecondaryButton]} 
                    onPress={() => setAlertVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, styles.cancelSecondaryButtonText]}>
                      {t('no') || "Ні"}
                    </Text>
                  </TouchableOpacity>

                  {/* Кнопка "Вийти" — закриває модалку і запускає handleLogout */}
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelDestructiveButton]} 
                    onPress={async () => {
                      setAlertVisible(false); // Закриваємо вікно
                      if (onConfirmAction) {
                        await onConfirmAction(); // Викликається handleLogout()
                      }
                    }}
                  >
                    <Text style={styles.modalButtonText}>
                      {t('modal_button_logout') || "Вийти"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({


  deleteOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center',
    alignItems: 'center',

    ...Platform.select({
      web: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 440,
      }
    })
  },

  // --- Контейнер самої модалки (біла картка) ---
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5, // Тінь для Android
    shadowColor: '#000', // Тіні для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  // --- Тексти в модалці ---
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  // --- Базовий стиль для кнопок ---
  modalButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // --- Контейнер для розташування ДВОХ кнопок в один ряд ---
  modalRowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12, // Відступ між кнопками "Ні" та "Вийти"
  },

  // --- Кнопка "Ні" (Сіра, контурна) ---
  cancelSecondaryButton: {
    flex: 1, // Займає рівно половину доступного місця
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  cancelSecondaryButtonText: {
    color: '#666',
  },

  // --- Кнопка "Вийти" (Червона/Коралова, деструктивна) ---
  cancelDestructiveButton: {
    flex: 1, // Займає другу половину місця
    backgroundColor: '#DE7272', // Твій колір для скасування/вихіду
  },

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