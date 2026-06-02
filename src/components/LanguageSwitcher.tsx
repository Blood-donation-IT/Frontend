import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../Theme/ThemeContext';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { colors } = useTheme();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem("appLanguage", newLang);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.primary }]} 
      onPress={toggleLanguage}
    >
      <Text style={styles.text}>
        {i18n.language === 'uk' ? 'UA' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20, // Відступ зверху
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 9999, // Щоб була поверх усього
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  text: {
    fontWeight: '800',
    fontSize: 12,
    color:"white"
  },
});