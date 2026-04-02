import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import "./src/i18n";
import { useEffect, useState } from 'react';
import i18n from './src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './src/Theme/ThemeContext'; 
import PushNotificationService from './src/services/PushNotificationService';
import { Platform } from 'react-native';

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
      } else {
        console.log("Web mode: Skipping native push notifications");
      }

      setIsReady(true);
    };

    setupApp();

    let unsubscribe: any;
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
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
