import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log('Background message handled:', remoteMessage.notification);
  return Promise.resolve();
});
