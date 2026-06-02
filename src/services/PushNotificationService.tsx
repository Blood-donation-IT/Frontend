import { Alert, Platform } from 'react-native';

class PushNotificationService {
  private messagingInstance: any = null;

  // Метод для отримання інстансу тільки на нативних платформах
  private getMessaging() {
    if (Platform.OS === 'web') return null;
    if (!this.messagingInstance) {
      const { getMessaging } = require('@react-native-firebase/messaging');
      this.messagingInstance = getMessaging();
    }
    return this.messagingInstance;
  }

  async requestUserPermission() {
    if (Platform.OS === 'web') return false;
    
    const { requestPermission, AuthorizationStatus } = require('@react-native-firebase/messaging');
    const instance = this.getMessaging();
    
    const authStatus = await requestPermission(instance);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  async getFcmToken() {
    if (Platform.OS === 'web') return null;

    try {
      const { getToken } = require('@react-native-firebase/messaging');
      const fcmToken = await getToken(this.getMessaging());
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
    return null;
  }

  async subscribeToTopic(topicName: string) {
    if (Platform.OS === 'web') return;

    try {
      const { subscribeToTopic } = require('@react-native-firebase/messaging');
      await subscribeToTopic(this.getMessaging(), topicName);
      console.log(`Subscribed to topic: ${topicName}`);
    } catch (error) {
      console.error(`Error subscribing to topic ${topicName}:`, error);
    }
  }

  initializeListeners() {
    if (Platform.OS === 'web') return () => {};

    const { onMessage, onNotificationOpenedApp, getInitialNotification } = require('@react-native-firebase/messaging');
    const instance = this.getMessaging();

    const unsubscribeOnMessage = onMessage(instance, async (remoteMessage: any) => {
      Alert.alert(
        remoteMessage.notification?.title || 'Новина донорства',
        remoteMessage.notification?.body
      );
    });

    onNotificationOpenedApp(instance, (remoteMessage: any) => {
      console.log('Opened from background:', remoteMessage.data);
    });

    getInitialNotification(instance).then((remoteMessage: any) => {
      if (remoteMessage) {
        console.log('Opened from quit state:', remoteMessage.data);
      }
    });

    return unsubscribeOnMessage;
  }

  async deleteToken() {
    if (Platform.OS === 'web') return;

    try {
      const { deleteToken } = require('@react-native-firebase/messaging');
      await deleteToken(this.getMessaging());
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }
}

export default new PushNotificationService();