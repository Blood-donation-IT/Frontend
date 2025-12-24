import { registerRootComponent } from 'expo';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log('Повідомлення оброблено у фоні (Modular):', remoteMessage.notification);
  
  return Promise.resolve();
});

registerRootComponent(App);
