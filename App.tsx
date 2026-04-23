import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';
import "./src/i18n";
import i18n from './src/i18n';

import { ThemeProvider } from './src/Theme/ThemeContext'; 
import PushNotificationService from './src/services/PushNotificationService';

import { Platform, useWindowDimensions, View, StyleSheet } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const { width } = useWindowDimensions();

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

  const isLargeWeb = Platform.OS === 'web' && width > 440;

  return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ThemeProvider>
//         <AppNavigator />
//       </ThemeProvider>
//     </GestureHandlerRootView>
//   );
// }
    <ThemeProvider>
      <View style={styles.rootContainer}>
        <View style={[
          styles.appWrapper,
          isLargeWeb && styles.webConstrained
        ]}>
          <AppNavigator />
        </View>
      </View>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1A1D1E',
  },
  webConstrained: {
    maxWidth: 440,
    maxHeight: 900, 
    borderRadius: 20,
    overflow: 'hidden',
  }
});
