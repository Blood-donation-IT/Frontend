import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';
import "./src/i18n";
import i18n from './src/i18n';

import { ThemeProvider } from './src/Theme/ThemeContext'; 
import PushNotificationService from './src/services/PushNotificationService';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupApp = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("appLanguage");

        if (savedLang) {
          await i18n.changeLanguage(savedLang);
        }
      } catch (e) {
        console.error("Language setup error:", e);
      }

      if (Platform.OS !== 'web') {
        try {
          const hasPermission = await PushNotificationService.requestUserPermission();

          if (hasPermission) {
            const token = await PushNotificationService.getFcmToken();
            if (token) console.log("Native Push Token ready");
          }
        } catch (error) {
          console.error("Notification setup error:", error);
        }
      }

      setIsReady(true);
    };

    setupApp();

    let unsubscribe;

    if (Platform.OS !== 'web') {
      unsubscribe = PushNotificationService.initializeListeners();
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  if (!isReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}