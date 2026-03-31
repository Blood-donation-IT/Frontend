import messaging, { 
  getMessaging, 
  getToken, 
  requestPermission, 
  subscribeToTopic, 
  unsubscribeFromTopic, 
  deleteToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  AuthorizationStatus 
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// #mobile: нативна Firebase Messaging реалізація для мобільних платформ
// #web: fallback реалізація PushNotificationService.web.ts без нативних API для веб-платформи

class PushNotificationService {
  private messagingInstance = getMessaging();

  async requestUserPermission() {
    const authStatus = await requestPermission(this.messagingInstance);
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
    try {
      const fcmToken = await getToken(this.messagingInstance);
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
    try {
      await subscribeToTopic(this.messagingInstance, topicName);
      console.log(`Subscribed to topic: ${topicName}`);
    } catch (error) {
      console.error(`Error subscribing to topic ${topicName}:`, error);
    }
  }

  initializeListeners() {
    const unsubscribeOnMessage = onMessage(this.messagingInstance, async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Новина донорства',
        remoteMessage.notification?.body
      );
    });

    onNotificationOpenedApp(this.messagingInstance, remoteMessage => {
      console.log('Opened from background:', remoteMessage.data);
    });

    getInitialNotification(this.messagingInstance).then(remoteMessage => {
      if (remoteMessage) {
        console.log('Opened from quit state:', remoteMessage.data);
      }
    });

    return unsubscribeOnMessage;
  }

  async deleteToken() {
    try {
      await deleteToken(this.messagingInstance);
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }
}

export default new PushNotificationService();