import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import "./src/i18n";
import { useEffect, useState } from 'react';
import i18n from './src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './src/Theme/ThemeContext'; 
import PushNotificationService from './src/services/PushNotificationService';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }

      try {
        const hasPermission = await PushNotificationService.requestUserPermission();
        
        if (hasPermission) {
          const token = await PushNotificationService.getFcmToken();
          
          if (token) {
            console.log("Token logic ready");
          }

          // await PushNotificationService.subscribeToTopic('donor_news_global');
        }
      } catch (error) {
        console.error("Notification setup error:", error);
      }

      setIsReady(true);
    })();

    const unsubscribe = PushNotificationService.initializeListeners();

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
