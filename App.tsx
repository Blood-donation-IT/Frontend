import AppNavigator from './src/navigation/AppNavigator';

import "./src/i18n";
import { useEffect, useState } from 'react';
import i18n from './src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
      setIsReady(true);
    })();
  }, []);

  if (!isReady) return null;

  return <AppNavigator />;
}
