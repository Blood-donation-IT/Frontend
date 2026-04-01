import { NativeModules } from "react-native";

try {
  if (!NativeModules?.RNFBAppModule) {
    throw new Error("RNFB module is unavailable in current runtime");
  }
  const messagingApi = require("@react-native-firebase/messaging");
  const messaging = messagingApi.getMessaging();
  messagingApi.setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log("Background message handled:", remoteMessage?.notification);
    return Promise.resolve();
  });
} catch (_error) {
  // ігнор помилки, якщо модуль не доступний на вебі
}
