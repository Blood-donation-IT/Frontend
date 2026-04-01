import { registerRootComponent } from 'expo';
import App from './App';
import './src/services/setupFirebaseMessaging';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// const messaging = getMessaging();
// setBackgroundMessageHandler(messaging, async (remoteMessage) => {
//   console.log('Повідомлення оброблено у фоні (Modular):', remoteMessage.notification);

//   return Promise.resolve();
// });

registerRootComponent(App);
