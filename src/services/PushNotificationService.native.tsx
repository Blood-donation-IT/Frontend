import { Alert, NativeModules } from "react-native";

type MessagingApi = {
  getMessaging: () => any;
  getToken: (instance: any) => Promise<string | null>;
  requestPermission: (instance: any) => Promise<number>;
  subscribeToTopic: (instance: any, topic: string) => Promise<void>;
  deleteToken: (instance: any) => Promise<void>;
  onMessage: (instance: any, cb: (msg: any) => void) => () => void;
  onNotificationOpenedApp: (instance: any, cb: (msg: any) => void) => void;
  getInitialNotification: (instance: any) => Promise<any>;
  AuthorizationStatus: { AUTHORIZED: number; PROVISIONAL: number };
};

function loadMessagingApi(): MessagingApi | null {
  if (!NativeModules?.RNFBAppModule) {
    return null;
  }
  try {
    return require("@react-native-firebase/messaging");
  } catch (_error) {
    return null;
  }
}

class PushNotificationService {
  private api = loadMessagingApi();
  private messagingInstance = this.api?.getMessaging?.() ?? null;

  async requestUserPermission() {
    if (!this.api || !this.messagingInstance) return false;
    const authStatus = await this.api.requestPermission(this.messagingInstance);
    return (
      authStatus === this.api.AuthorizationStatus.AUTHORIZED ||
      authStatus === this.api.AuthorizationStatus.PROVISIONAL
    );
  }

  async getFcmToken() {
    if (!this.api || !this.messagingInstance) return null;
    try {
      return await this.api.getToken(this.messagingInstance);
    } catch (_error) {
      return null;
    }
  }

  async subscribeToTopic(topicName: string) {
    if (!this.api || !this.messagingInstance) return;
    await this.api.subscribeToTopic(this.messagingInstance, topicName);
  }

  initializeListeners() {
    if (!this.api || !this.messagingInstance) return () => {};

    const unsubscribeOnMessage = this.api.onMessage(this.messagingInstance, (remoteMessage: any) => {
      Alert.alert(
        remoteMessage?.notification?.title || "Новина донорства",
        remoteMessage?.notification?.body || ""
      );
    });

    this.api.onNotificationOpenedApp(this.messagingInstance, () => {});
    this.api.getInitialNotification(this.messagingInstance).catch(() => null);

    return unsubscribeOnMessage;
  }

  async deleteToken() {
    if (!this.api || !this.messagingInstance) return;
    await this.api.deleteToken(this.messagingInstance);
  }
}

export default new PushNotificationService();
